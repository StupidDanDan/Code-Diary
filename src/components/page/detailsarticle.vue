<template>
  <div class="detailsarticle">
    <div class="loadingdiv" v-if="detailsarticleshow[0]">
      <Icon type="load-c" size=40 class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </div>
    <div class="detailsarticlediv" v-if="detailsarticleshow[1]">
        <!--作者部分 -->
        <div class="authormessage">
            <img class="authorimg" :src="articleauthor.userphoto"></img>
            <div class="authorcontent">
                <p>{{articleauthor.userid}}</p>
                <p>{{articleauthor.usershowme}}</p>
            </div>
        </div>
        <!-- 文章部分 -->
        <div class="articlemessage">
            <div class="articlecontent" v-html="detailsarticle.detailpagecontent"></div>
            <div class="aricledate">
                <p>{{detailsarticle.createdAt | filterByTime}}</p>
                <p>著作权归属作者所有</p>
            </div>
        </div>
        <!-- 评论部分 -->
        
    </div>
  </div>
</template>

<script>
export default {
    data (){
      return {
        detailsarticle:[],
        articleauthor:[],
        detailsarticleshow:[true,false],
      }
    }, 
    created() {
        console.log(this.$route.query.detailpageid)
        this.axios.get('http://txspring.cn:8010/getContentByPageDeatilId?detailid=' + this.$route.query.detailpageid).then((res)=>{
            if(res.data.type=="0"){
                var _this = this;
                setTimeout(function() {
					_this.$Message.error('查找出错，请联系管理员');
				}, 1000);          
            }else{
                var _this = this;
                setTimeout(function() {
					_this.detailsarticleshow=[false,true];
                }, 1000);
                this.detailsarticle = res.data;
                this.axios.get('http://txspring.cn:8010/findByUserIdDao?userid='+ this.detailsarticle.detaileuserid).then((res)=>{
                  if(res.data.type=="0"){
                    this.$Message.error('作者信息读取失败');
                  }
                  else{
                      this.articleauthor = res.data;
                      console.log(this.articleauthor)
                  }
                })
                // console.log(this.detailsarticle)
            }
       })
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
.detailsarticle{
    .loadingdiv{
        color:#2d8cf0;
        font-size: 24px;
        text-align: center;
        margin: 280px 0;
    }
    .detailsarticlediv{
        padding: 40px;
    }
    .authormessage{
        padding-bottom: 20px;
        border-bottom:1px solid #ebebeb;
        text-align: left;
        >div{
            display: inline-block;
            vertical-align: top;    
        }
        .authorimg{
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 10px;
        }
        .authorcontent{
            >p{
                line-height: 25px;
                font-size: 14px;
                color: #8590a6;
                &:nth-of-type(1){
                    font-weight: 900;
                    color: #444;
                }
            }
        }
    }
    .articlemessage{
        padding: 20px;
        text-align: left;
        border-bottom:1px solid #ebebeb;
        .aricledate{
            text-align: right;
            margin-top: 30px;
        }
    }
}

</style>
