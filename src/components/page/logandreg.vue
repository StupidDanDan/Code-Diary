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
  created(){
    if (this.$cookieStore.getCookie('userid')==null || this.$cookieStore.getCookie('userpassword') == null) {
        console.log('没有cookie');
    } else {
        this.axios.post('http://txspring.cn:8010/getUser',this.qs.stringify({
								user: this.$cookieStore.getCookie('userid'),
								password: this.$cookieStore.getCookie('userpassword')
						})).then(res => {
                            if (res.data.type == "0") {
                                 this.$Message.success('欢迎使用Code-Diary'); 
                            } else {
                                this.$Message.success('检测到您已经有账号，已经自动帮您登录'); 
                                this.$router.push('/index');
                                var _this = this;
                                setTimeout(function() {
									                  _this.$router.push('/index');
								                }, 1000);
                            }                                
            })
    }
    console.log(this.$cookieStore.getCookie('userid'));
  },
  mounted() {
    const logandregindex = require('./logandregindex')
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
