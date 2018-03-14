<template>
  <div class="detailsarticle">
    <div class="loadingdiv" v-if="detailsarticleshow[0]">
      <Icon type="load-c" size=40 class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </div>
    <div class="detailsarticlediv" v-if="detailsarticleshow[1]">
        <!--作者部分 -->
        <usermessagediv :articleauthorid="detailsarticle.detaileuserid"></usermessagediv>
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
import usermessagediv from '@/components/common/usermessagediv'
export default {
    data (){
      return {
        detailsarticle:[],
        articleauthor:[],
        detailsarticleshow:[true,false],
      }
    },
    components:{
        usermessagediv
    },
    created() {
        this.axios.get('http://txspring.cn:8010/getContentByPageDeatilId?detailid=' + this.$route.query.detailpageid).then((res)=>{
            if(res.data.type=="0"){
                setTimeout(() => {
                    this.$Message.error('查找出错，请联系管理员');
                }, 1000);            
            }else{
                this.detailsarticle = res.data;
                setTimeout(() => {
                    this.detailsarticleshow=[false,true];
                }, 1000);               
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
        border-bottom:1px solid #ebebeb;
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
