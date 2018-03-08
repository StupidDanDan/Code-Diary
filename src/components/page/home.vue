<template>
  <div class="home">
   <Tabs value="byhot">
        <TabPane label="热门文章" icon="fireball" name="byhot">
          <ul>
            <li>
              <div>
                <span style="font-size:15px;color:#8590a6">热门内容，来自：京东</span>
                <a href=""></a>
              </div>
              <div style="margin:3px 0">
                <span style="font-size:15px;color:#000;font-weight: 600;"> 头像</span>
                <span style="font-size:14px;color:#646464;">,种一棵树最好的时间是十年前，其次是现在。</span>
              </div>
              <div>
                <h2 style="font-size: 18px;font-weight: 600;margin:6px 0;color: #000">京东一直在亏，刘强东为什么还那么有钱？</h2>
                <p style="color:#646464;font-size:15px;line-height:26px">我做了一个款。每天自然流量能产生3万元的纯利。但是我每天直通车要烧4万元，直通车每天亏损3万元。我的账面，是平的。我做了一个款。每天自然流量能产生3万元的纯利。但是我每天直通车要烧4万元，直通车每天亏损3万元。我的账面，是平的。我做了一个款。每天自然流量能产生3万元的纯利。但是我每天直通车要烧4万元，直通车每天亏损3万元。我的账面，是平的。我做了一个款。每天自然流量能产生3万元的纯利。但是我每天直通车要烧4万元，直通车每天亏损3万元。我的账面，是平的。</p>
              </div>
              <div style="color:#77839c;font-size:14px">
                <a><span></span><span>2.2K</span></a>
                <a><span></span><span>410条评论</span></a>
                <a><span></span><span>分享</span></a>
                <a><span></span><span>收藏</span></a>
                <a><span></span><span>...</span></a>
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
 a{
   margin-right:20px
 }
</style>
