<template>
  <div class="home">
   <Tabs value="byhot">
        <TabPane label="热门文章" icon="fireball" name="byhot">
          <ul>
             <li v-for="item in allarticle">
             <button class="Button TopstoryItem-rightButton Button--plain" data-tooltip="不感兴趣" data-tooltip-position="bottom" type="button"><svg viewBox="0 0 14 14" class="Icon Icon--remove" width="10" height="10" aria-hidden="true" style="height: 10px; width: 10px;"><title></title><g><path d="M8.486 7l5.208-5.207c.408-.408.405-1.072-.006-1.483-.413-.413-1.074-.413-1.482-.005L7 5.515 1.793.304C1.385-.103.72-.1.31.31-.103.724-.103 1.385.305 1.793L5.515 7l-5.21 5.207c-.407.408-.404 1.072.007 1.483.413.413 1.074.413 1.482.005L7 8.485l5.207 5.21c.408.407 1.072.404 1.483-.007.413-.413.413-1.074.005-1.482L8.485 7z"></path></g></svg></button>
              <div>
                <span class="hotCon">来自分类：{{}}</span>
                <a href=""></a>
              </div>
              <div class="homeSlogan">
                <img />
                <span>,种一棵树最好的时间是十年前，其次是现在。</span>
              </div>
              <div class="homeCon">
                <h2>{{item.detailpagetitle}}</h2>
                <p v-html="item.detailpagecontent"></p>
              </div>
              <div class="homeConBtn">
                <a><span></span><span>2.2K</span></a>
                <a><span></span><span>410条评论</span></a>
                <a><span></span><span>分享</span></a>
                <a><span></span><span>收藏</span></a>
              </div>
            </li>
            
          </ul>
        </TabPane>
        <TabPane label="时间文章" icon="ios-clock" name="bytime">时间文章</TabPane>
    </Tabs>
  </div>
</template>

<script>
export default {
  data(){
    return {
      allarticle:[],
    }
  },
  created(){
    var _this = this;
    this.axios.get('http://txspring.cn:8010/getAllDetailPage')
    .then(function (response) {
      _this.allarticle = response.data;
      console.log(_this.allarticle);
      
    })

  }

}
</script>

<style>
 body{
     background: #f6f6f6;
 }
 ul{
   text-align:left;
   margin:0 16px;
 }
  ul li{
    border-bottom:1px solid #ccc;
    padding:20px 0;
  }
 a{
   margin-right:20px
 }
 .hotCon{
  font-size:15px;
  color:#8590a6;
 }
 .homeSlogan{
   margin:3px 0;
 }
 .homeSlogan img{
   width:20px;
   height:20px;
 }
 .homeSlogan span{
  font-size:14px;
  color:#646464;
 }
 .homeCon h2{
   font-size: 18px;
   font-weight: 600;
   margin:6px 0;
   color: #000
 }
 .homeCon p{
   height:55px;
   line-height:26px;
   overflow:hidden;
   text-overflow:elipsis;
   display:-webkit-box;
   -webkit-box-orient:vertical;
   -webkit-line-clamp:2;
 }
 .homeCon p a{
    color:#646464;
   font-size:15px;
 }
 .homeConBtn{
   color:#77839c;
   font-size:14px
 }
ul li{
  position:relative;
}
 .TopstoryItem-rightButton {
    position: absolute;
    top: 20px;
    right: 16px;
    background-color: #fff;
    border: none;
}


</style>
