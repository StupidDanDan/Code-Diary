<template>
  <div class="home">
   <Tabs v-model="tabValue">
        <TabPane label="动态文章" icon="ios-clock" name="bytime">
          <allarticle></allarticle>
        </TabPane>
        <TabPane label="热门文章" icon="fireball" name="byhot">
          <hotarticle></hotarticle>
        </TabPane>
        <TabPane label="搜索文章" icon="ios-bell" name="bysearch">
          <searcharticle></searcharticle>        
        </TabPane>
    </Tabs>
  </div>
</template>

<script>
import allarticle from '@/components/page/home/allarticle'
import hotarticle from '@/components/page/home/hotarticle'
import searcharticle from '@/components/page/home/searcharticle'
export default {
  data(){
    return {
      tabValue:'bytime'
    }
  },
  components:{
    allarticle,hotarticle,searcharticle
  },
  methods:{
    changeTab(value) {
      if (value) {
        this.tabValue = value;
      }
    },
  }

}
</script>

<style>
.home ul{
   text-align:left;
   margin:0 16px;
 }
.home ul li{
    border-bottom:1px solid #ccc;
    padding:20px 0;
  }
.home ul li{
  position:relative;
}
</style>
