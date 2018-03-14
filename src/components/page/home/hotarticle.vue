<template>
  <div class="hotarticle">
    <div class="loadingdiv" v-if="isloading">
      <Icon type="load-c" size=40 class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </div>
    <ul v-else>
        <li v-for="item in hotarticle">
            <articleitem :item="item"></articleitem>
        </li> 
    </ul>
  </div>
</template>

<script>
import articleitem from '@/components/common/articleitem'
export default {
    data(){
        return {
            hotarticle:[],
            isloading:true
        }
    },
    components:{
        articleitem
    },
    created(){
        this.isloading = true;
        this.axios.get('http://txspring.cn:8010/getAllArticleCount').then((res) => {
            this.hotarticle = res.data;
            setTimeout(() => {
                this.isloading = false;
            }, 2000);
        })
    }
}   
</script>
<style lang="less">
.hotarticle{
    .loadingdiv{
        color:#2d8cf0;
        font-size: 24px;
        text-align: center;
        margin: 250px 0;
    }
}

</style>

