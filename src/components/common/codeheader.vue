<template>
  <div class="codeheader fixed">
    <!-- logo -->
    <img src="../../assets/images/logo.png" alt="" class="logo">
    <!-- icon 消息-->
    <i slot="icon" class="iconfont icon-renwutixing"></i>
    <!-- icon 提示 -->
    <i slot="icon" class="iconfont icon-weixin"></i>
    <!-- 头像 -->
    <img class="touxiang" v-lazy="articleauthor.userphoto"></img>
    
  </div>
</template>

<script>

export default {
  data(){
     return {
       articleauthor:[],
     }
  },
  created(){
    var userid = this.$cookieStore.getCookie('userid');
    console.log(userid);
    this.axios.get('http://txspring.cn:8010/findByUserIdDao?userid='+ userid).then((res)=>{
        console.log(res);
        if(res.data.type=="0"){
            this.$Message.error('作者信息读取失败');
        }
        else{
            this.articleauthor = res.data;
        }
    })
  }
}
</script>

<style lang="less" rel="stylesheet/less">
@import "./codeheader.less";

</style>
