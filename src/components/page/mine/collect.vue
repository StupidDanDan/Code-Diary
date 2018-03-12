<template>
  <div class="collect">
    <div class="loadingdiv" v-if="creationshow[0]">
      <Icon type="load-c" size=40 class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </div>
    <div class="zerocreatdiv" v-if="creationshow[1]">您暂时没有作品哦~快去创作吧！</div>
    <div v-if="creationshow[2]">
        <ul class="articletable">
          <li class="tableheader">
            <div>文章标题</div>
            <div>发表时间</div>
            <div>作者</div>
          </li>
          <li class="tableheader" v-for="item in collectarticle" @click="godetailsarticle(item.detailpageid)">
            <div>{{item.detailpagetitle}}</div>
            <div>{{item.createdAt | filterByTime}}
            </div>
            <div>作者</div>
          </li>
          <li class="tableheader">
            <div>已经到底，没有更多的收藏文章了</div>
          </li>
        </ul>
    </div>   
  </div>
</template>

<script>
export default {
  data (){
      return {
        collectarticle:[],
        creationshow:[true,false,false],
      }
    },  
    created () {    
      var userid  = this.$cookieStore.getCookie('userid');
      this.axios.get('http://txspring.cn:8010/getAllCollection?userid='+userid).then((res)=>{
                  if(res.data.type=="0"){
                      var _this = this;
                      setTimeout(function() {
									       _this.creationshow = [false,true,false];
								      }, 1000);
                      
                  }
                  else{
                    var _this = this;
                    setTimeout(function() {
									      _this.creationshow = [false,false,true];
								    }, 1000);
                    this.collectarticle = res.data;
                    console.log(this.collectarticle)
                  }
       })
       
    },
    methods:{
      godetailsarticle(num){
        this.$router.push({
            path: '/index/detailsarticle', // 路径
            query: { // 查询参数
              detailpageid: num,
            }
        })
      }
    },
    filters:{
      filterByTime(value){
        if(value!=""){       
          return tools.returnYearMonth(value);
        }
        else{
          return value;
        }
      }
    }
}
</script>

<style lang="less" rel="stylesheet/less">
.collect{
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }
  .demo-spin-col{
    height: 100px;
    position: relative;
    border: 1px solid #eee;
  }
  .loadingdiv{
    color:#2d8cf0;
    font-size: 24px;
    text-align: center;
    margin-top: 90px;
    margin-left: 250px;
  }
  .zerocreatdiv{
    color:#2d8cf0;
    font-size: 16px;
    margin-top: 90px;
    margin-left: 200px;
  }
  .articletable{
    .tableheader{
      border-bottom: 1px solid #8590a6;
      padding: 10px 0;
      color: #8590a6;
      text-align: center;
      cursor: pointer;
      &:nth-last-of-type(1){
        border-bottom:0;
      }
      >div{
        display: inline-block;
        width: 200px;
      }
    }
  }
  
}

</style>
