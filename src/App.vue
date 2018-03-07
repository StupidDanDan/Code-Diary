<template>
  <div id="app">
    <codeheader></codeheader>
    <div class="globalwrap">  
        <div class="globalcontent">
            <router-view/>
        </div>
        <div class="globalmenu">
            <router-link tag="div" class="globalmenuitem" :to="{ name: 'home'}">
                <i class="iconfont icon-bianfuxia-"></i>
                <i class="ifont">首页</i>
            </router-link>
            <router-link tag="div" class="globalmenuitem" :to="{ name: 'classify'}">
                <i class="iconfont icon-gangtiexia-"></i>
                <i class="ifont">文章分类</i>
            </router-link>
            <router-link tag="div" class="globalmenuitem" :to="{ name: 'book'}">
                <i class="iconfont icon-duyandashu"></i>
                <i class="ifont">书籍</i>
            </router-link>
            <router-link tag="div" class="globalmenuitem" :to="{ name: 'book'}">
                <i class="iconfont icon-xiaotou"></i>
                <i class="ifont">写文章</i>
            </router-link>
            <router-link tag="div" class="globalmenuitem" :to="{ name: 'mine'}">
                <i class="iconfont icon-jiaodoushiwushi"></i>
                <i class="ifont">个人信息</i>
            </router-link>
            <router-link tag="div" class="globalmenuitem" :to="{ name: 'book'}">
                <i class="iconfont icon-qigai"></i>
                <i class="ifont">关于我们</i>
            </router-link>
        </div>
    </div>
    
    
  </div>
</template>

<script>
import codeheader from '@/components/common/codeheader'	
export default {
  name: 'App',
  components: {	
		  codeheader,	
    },
}
</script>

<style lang="less" rel="stylesheet/less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
  .globalwrap{
      width: 1260px;
      margin:0 auto;
      margin-top: 100px;
      background: #f6f6f6;
      >div{
          display: inline-block;
      }
  }
  .globalmenu{
    vertical-align: top;
    margin-left: 50px;
    width: 300px;
    height: 180px;
    background: #FFFFFF;
    box-shadow:2px 2px 2px #b3b5b9;
    .globalmenuitem{
        font-size: 0;
        width: 90px;
        height: 90px;
        padding: 19px 0;
        display: inline-block;
        color: #8590a6;
        cursor: pointer;
        i{
            display: block;
        }
        .iconfont{
            font-size: 24px;
            
        }
        .ifont{
            font-size: 14px;
        }
        &:hover{
            color: #76b1ff;
        }
    }
  }
  .globalcontent{
      background: #FFFFFF;
      border-radius: 1%;
      width: 900px;
  }
}

</style>
