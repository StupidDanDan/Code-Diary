<template>
  <div class="mine">
    <Menu  active-name="1" @on-select="goMenuView">
        <MenuGroup title="文章管理">
            <MenuItem name="1">
                <Icon type="document-text"></Icon>
                我的文章              
            </MenuItem>
            <MenuItem name="2">
                <Icon type="chatbubbles"></Icon>
                我的收藏
            </MenuItem>
        </MenuGroup>
        <MenuGroup title="其他管理">
            <MenuItem name="3">
                <Icon type="heart"></Icon>
                城市天气
            </MenuItem>
            <MenuItem name="4">
                <Icon type="heart-broken"></Icon>
                显示位置
            </MenuItem>
            <!-- <MenuItem name="5">
                <Icon type="heart-broken"></Icon>
                官网版本
            </MenuItem> -->
        </MenuGroup>
    </Menu>
    <div class="MenuView">
        <creation v-if="MenuView[1]"></creation>  
        <collect v-if="MenuView[2]"></collect>
        <weather v-if="MenuView[3]"></weather>
        <location v-if="MenuView[4]"></location>
    </div>
  </div>
</template>

<script>
import creation from '@/components/page/mine/creation'
import collect from '@/components/page/mine/collect'
import weather from '@/components/page/mine/weather'
import location from '@/components/page/mine/location'	
export default {
  data () {
      return {
        MenuView: [false,true,false,false,false]
      }
  },
  components:{
    creation,collect,weather,location,
  },
  methods:{
      goMenuView: function(name) {
        this.MenuView = [false,false,false,false,false];
        this.MenuView[name] = true;
      }
  }
}
</script>

<style lang="less" rel="stylesheet/less">
@import "./mine.less";
</style>
