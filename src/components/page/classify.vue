<template>
  <div class="classify">
    <Tabs value="name1">
        <TabPane label="JavaScript" name="name1">
          <jsarticle></jsarticle>
        </TabPane>
        <TabPane label="CSS" name="name2">
          <cssarticle></cssarticle>
        </TabPane>
        <TabPane label="Node.JS" name="name3">
          <nodearticle></nodearticle>
        </TabPane>
        <TabPane label="Mysql" name="name4">
          <mysqlarticle></mysqlarticle>
        </TabPane>
        <TabPane label="Mui" name="name5">
          <muiarticle></muiarticle>
        </TabPane>
        <TabPane label="Project" name="name6">
          <projectarticle></projectarticle>
        </TabPane>
    </Tabs>
  </div>
</template>

<script>
import jsarticle from '@/components/page/classify/jsarticle'
import cssarticle from '@/components/page/classify/cssarticle'
import nodearticle from '@/components/page/classify/nodearticle'
import mysqlarticle from '@/components/page/classify/mysqlarticle'
import muiarticle from '@/components/page/classify/muiarticle'
import projectarticle from '@/components/page/classify/projectarticle'
export default {
  components:{
    jsarticle,cssarticle,nodearticle,mysqlarticle,muiarticle,projectarticle
  },
}
</script>

<style>
.classify ul{
   text-align:left;
   margin:0 16px;
 }
.classify ul li{
    border-bottom:1px solid #ccc;
    padding:20px 0;
  }
.classify ul li{
  position:relative;
}
</style>
