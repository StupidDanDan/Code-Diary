<template>
  <div class="mine">
    <Menu  @on-select="goMenuView">
        <MenuGroup title="个人信息">
            <MenuItem name="1">
                 <Icon type="document-text"></Icon>个人信息              
            </MenuItem>
        </MenuGroup>
        <MenuGroup title="文章管理">
            <MenuItem name="2">
                 &nbsp;<Icon type="document-text"></Icon>我的文章              
            </MenuItem>
            <MenuItem name="3">
                <Icon type="chatbubbles"></Icon>我的收藏
            </MenuItem>
        </MenuGroup>
        <MenuGroup title="其他管理">
            <MenuItem name="4">
                <Icon type="heart"></Icon>城市天气
            </MenuItem>
            <MenuItem name="5">
                <Icon type="heart-broken"></Icon>显示位置
            </MenuItem>
            <!-- <MenuItem name="5">
                <Icon type="heart-broken"></Icon>
                官网版本
            </MenuItem> -->
        </MenuGroup>
    </Menu>
    <div class="MenuView">
        <userinfo v-if="MenuView[1]"></userinfo>
        <creation v-if="MenuView[2]"></creation>  
        <collect v-if="MenuView[3]"></collect>
        <weather v-if="MenuView[4]"></weather>
        <location v-if="MenuView[5]"></location>
    </div>
  </div>
</template>

<script>
import userinfo from '@/components/page/mine/userinfo'
import creation from '@/components/page/mine/creation'
import collect from '@/components/page/mine/collect'
import weather from '@/components/page/mine/weather'
import location from '@/components/page/mine/location'	
export default {
  data () {
      return {
        MenuView: [true,false,false,false,false,false]
      }
  },
  components:{
    userinfo,creation,collect,weather,location,
  },
  methods:{
      goMenuView: function(name) {
        this.MenuView = [false,false,false,false,false,false];
        this.MenuView[name] = true;
      }
  }
}
</script>

<style lang="less" rel="stylesheet/less">
@import "./mine.less";
</style>
