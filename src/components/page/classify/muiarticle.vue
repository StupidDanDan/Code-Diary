<template>
  <div class="muiarticle">
    <div class="loadingdiv" v-if="isloading">
      <Icon type="load-c" size=40 class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </div>
    <ul v-else>
        <li v-for="item in muiarticle">
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
            muiarticle:[],
            isloading:true
        }
    },
    components:{
        articleitem
    },
    created(){
        this.axios.get('http://txspring.cn:8010/getAllClassAll?classid=004').then(res => {
            console.log(222);
            console.log(res);
            this.muiarticle = res.data;
            setTimeout(() => {
                this.isloading = false;
            }, 2000);
		});
    }
}   
</script>
<style lang="less">
.muiarticle{
    .loadingdiv{
        color:#2d8cf0;
        font-size: 24px;
        text-align: center;
        margin: 250px 0;
    }
}

</style>

