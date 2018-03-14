<template>
  <div class="book">
    <!-- 此处来个banner -->
    <Carousel autoplay  loop :height="300">
        <CarouselItem>
            <div class="demo-carousel"><img src="http://oz033lzfm.bkt.clouddn.com/book.jpg"></div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel"><img src="http://oz033lzfm.bkt.clouddn.com/book1.jpg"></div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel"><img src="http://oz033lzfm.bkt.clouddn.com/book2.jpg"></div>
        </CarouselItem>
    </Carousel>
    <!-- 来个菜单 -->
    <Tabs>
        <TabPane label="热门" icon="bonfire">
          <booklist :booklists="books[0]"></booklist>
        </TabPane>
        <TabPane label="新书" icon="wand">
          <booklist :booklists="books[1]"></booklist>
        </TabPane>
        <TabPane label="趣事" icon="icecream">
          <booklist :booklists="books[2]"></booklist>
        </TabPane>
        <TabPane label="生活" icon="coffee">
          <booklist :booklists="books[3]"></booklist>
        </TabPane>
        <TabPane label="故事" icon="videocamera">
          <booklist :booklists="books[4]"></booklist>
        </TabPane>
    </Tabs>
    <!-- 此处来个内容 -->
  </div>
</template>

<script>
import booklist from '@/components/common/booklist'
export default {
  data(){
    return{
      books:[],
      isloading:true,
    }
  },
  components:{
    booklist,
  },
  created(){
    this.axios.get('http://oz033lzfm.bkt.clouddn.com/bDetail.json').then((res) => {
      this.books = res.data.data;
      setTimeout(() => {
        this.isloading = false;
      }, 2000);
    })
  }
}
</script>

<style lang="less">
.book{
  .ivu-carousel-track{
     img{
      width: 900px;
      height: 300px;
    }
  }
}
</style>
