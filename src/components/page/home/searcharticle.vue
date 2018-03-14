<template>
  <div class="searcharticle">
      <Input v-on:input="searctharticle" v-model="searchcontent" style="width:500px;" placeholder="请输入您要搜索的内容" :maxlength="20" clearable></Input>
            <ul v-if="isloading">
              <li v-for="item in searcharticle">
                <articleitem :item="item"></articleitem>
              </li> 
            </ul>
        <div v-else>没有查询到你想要的文章</div>
  </div>
</template>

<script>
import articleitem from '@/components/common/articleitem'
export default {
    data(){
        return {
            searcharticle:[],
            searchcontent:'',
            isloading:true
        }
    },
    components:{
        articleitem
    },
    created(){
       this.axios.get('http://txspring.cn:8010/getAllArticleDesc').then((res) => {
            this.searcharticle = res.data;
        })
    },
    methods:{
        searctharticle(){
      // console.log(this.searchcontent);
            this.axios.get('http://txspring.cn:8010/getDetailByTitle?title=' + this.searchcontent).then((res) => {
                if (res.data.type == '0') {
                    this.searcharticle = [];
                    this.$Message.warning('没有查询到你想要的文章');
                } else {
                    this.searcharticle = res.data;
                }
            })
      
        }
    }
}     
</script>
<style lang="less">
.searcharticle{
    padding: 20px;
    .loadingdiv{
        color:#2d8cf0;
        font-size: 24px;
        text-align: center;
        margin: 250px 0;
    }
}
</style>

