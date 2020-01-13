<template>
  <div id="widget">
    <header id="header">
      <img src="./assets/logo.png" alt="" srcset="">
      <span>vue-simple-view</span>
    </header>
    <sMenu id="menu" :menus="menus" v-model="viewType" @moveItem="moveItem" />
    <sView id="view" :imgList="imgList" :viewType="viewType" :orderBy="orderBy" @changeData="changeData" />
  </div>
</template>

<script>

import sView from '@/components/view.vue'
import sMenu from '@/components/menu.vue'

export default {
  name: 'app',
  components: {
    sView,
    sMenu
  },
  data() {
    return {
      menus: [],
      imgList: [],
      viewType: 'all',
      orderBy: 'desc',
    }
  },
  methods: {
    changeData(val) {
      this.orderBy = val
    },
    moveItem(id, type) {
      console.log('move', id, type)
      if (id > 0) {
        // 深拷贝一份
        let newList = JSON.parse(JSON.stringify(this.imgList))
        let chooseImg = newList.find(item => item.id == id)
        chooseImg.type = type
        // 更新数据 - 仅本地
        this.imgList = newList
      }
    }
  },
  created() {
    // 重新获取mock数据
    this.mockApi('/mock/getMenuList.json').then(res => {
      this.menus = res.data
    })
    this.mockApi('/mock/getImgList.json').then(res => {
      this.imgList = res.data
    })
  }
}
</script>

<style>
  /* reset 重置样式 */
  html, body {
    height: 100%;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 20px;
    color: #304455;
    padding: 0;
    margin: 0;
  }

  header, div, span, p, ul, li, dl, dt, dd {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    border: none;
    outline: none;
    list-style: none;
  }

  a {
    text-decoration: none;
    color: #0366d6;
  }

  </style>
  
  <style lang="scss"scoped>
  $head-h: 60px;
  $menu-w: 240px;

  #widget {
    height: 100%;

    #header {
      position: fixed;
      padding: 10px 20px;
      height: $head-h;
      top: 0;
      left: 0;
      width: 100%;
      box-shadow: 0 0 1px rgba(0, 0, 0, 0.25);

      span {
        line-height: $head-h - 20px;
      }

      img {
        width: 20px;
        vertical-align: middle;
        margin-right: 10px;
      }
    }

    #menu {
      position: fixed;
      top: $head-h;
      left: 0;
      height: calc(100% - #{$head-h});
      width: $menu-w;
      padding: 35px 0px 60px 20px;
      overflow-y: scroll;
    }

    #view {
      position: fixed;
      top: $head-h;
      left: $menu-w;
      height: calc(100% - #{$head-h});
      width: calc(100% - #{$menu-w});
      padding: 35px;
      overflow-y: auto;
    }
  }
</style>