<template>
  <div class="s-view">
    <div class="tool">
      <span @click="changeData">时间排序</span>
      <p :class="getArrowClass"></p>
    </div>
    <div class="view-boxs">
      <div v-for="(item, inx) in viewImgList"
        :key="`view-box-${inx}`"
        class="view-box"
        @dragstart="dragImg($event, item)"
        @dragend="dragImgEnd"
        draggable="true">
        <dl>
          <dd>
            <img :src="item.src" alt="">
          </dd>
          <dt>名称：{{item.title}}</dt>
          <dt>分类：{{item.type}}</dt>
          <dt>{{item.createDate | getDateText}}</dt>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sView',
  props: {
    imgList: {
      type: Array,
      default() {
        return []
      }
    },
    viewType: {
      type: String
    },
    orderBy: {
      type: String,
      default: 'desc'
    }
  },
  filters: {
    getDateText(val) {
      let time = new Date(+val)
      let checkType = Date.prototype.toString.call(time)
      if (checkType !== 'Invalid Date') {
        let timeObj = {
          Y: time.getFullYear(),
          M: time.getMonth() + 1,
          D: time.getDay(),
          h: time.getHours(),
          m: time.getMinutes(),
          s: time.getSeconds(),
        }
        return `${timeObj.Y}-${timeObj.M}-${timeObj.D} ${timeObj.h}:${timeObj.m}:${timeObj.s}`
      }
      return ''
    }
  },
  computed: {
    getArrowClass() {
      return this.orderBy === 'asc' ? 'arrow-up' : 'arrow-down'
    }
  },
  data() {
    return {
      viewImgList: [],
    }
  },
  methods: {
    createData(orderBy = 'desc') {
      // 父组件传入列表数据
      let list = JSON.parse(JSON.stringify(this.imgList))
      // 展示分类
      let type = this.viewType
      // 过滤指定分类
      let filterType = type === 'all' ? list : list.filter(item => item.type === type)
      // 排序
      let sortFun = orderBy === 'asc' ?  (a, b) => a.createDate - b.createDate : (a, b) => b.createDate - a.createDate
      let orderList = filterType.sort(sortFun)
      this.viewImgList = orderList
      console.log('createData')
    },
    changeData() {
      let orderBy = this.orderBy === 'desc' ? 'asc' : 'desc'
      // 触发父组件事件
      this.$emit('changeData', orderBy)
      // 传值防延迟
      this.createData(orderBy)
    },
    dragImg(e, item) {
      e.dataTransfer.setData('text/plain', item.id)
      // console.log('拖动对象', item)
    },
    dragImgEnd() {
      
    }
  },
  watch: {
    viewType() {
      this.createData()
    },
    'imgList': {
      handler(val) {
        // 有数据才更新
        if (val && val.length) {
          this.createData()
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .s-view {
    .tool {
      display: flex;

      span {
        cursor: pointer;
        user-select: none;
      }
      .arrow-up {
        width: 0;
        height: 0;
        border: 6px solid;
        border-color: transparent transparent #000;
        margin-left: 5px;
        cursor: pointer;
      }
      .arrow-down {
        width: 0;
        height: 0;
        border: 6px solid;
        border-color: #000 transparent transparent;
        margin-left: 5px;
        cursor: pointer;
        transform: translateY(10px);
      }
    }
    .view-boxs {
      display: flex;
      flex-wrap: wrap;

      .view-box {
        width: 200px;
        overflow: hidden;

        dl {
          margin: 10px 10px;

          img {
            width: 100%;
          }

          dt {
            text-align: center;
            font-size: 16px;
          }
        }
      }
    }
  }
</style>
