<template>
  <div class="logandreg">
      <canvas id="stage"></canvas>
      <div class="logandregView">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
      
  </div>
</template>

<script>
export default {
  mounted() {
    const logandregindex = require('./logandregindex')
    console.log()
    logandregindex()
  }
}
</script>

<style>
.logandreg{
  height: 100%;
}
.stage-wrap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -99;
}
.stage-wrap,
#stage {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.logandregView{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
}
</style>
