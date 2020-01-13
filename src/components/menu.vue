<template>
  <div class="menu">
    <ul>
      <li v-for="(item, inx) in menus" :key="inx"
        @dragover="allowDrop"
        @drop="drop($event, item.type)"
        @dragenter="dragenter"
        @dragleave="dragleave"
        :class="getActiveLi(item.type)">
        <a href="javascript:void(0);" @click="changeType(item.type)" target="_self">{{item.title}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'sMenu',
  model: {
    prop: 'viewType',
    event: 'change'
  },
  props: {
    menus: {
      type: Array,
      default() {
        return []
      }
    },
    viewType: {
      type: String,
      default: '',
    }
  },
  methods: {
    getActiveLi(type) {
      if (type === this.viewType) {
        return 'active'
      }
    },
    changeType(type) {
      this.$emit('change', type)
    },
    drop(e, type) {
      let ele = e.target
      ele.style.fontSize = '1em'
      let imgId = e.dataTransfer.getData('text/plain')
      if (type !== 'all') {
        this.$emit('moveItem', imgId, type)
      }
    },
    dragenter(e) {
      let ele = e.target
      ele.style.fontSize = '1.3em'
    },
    dragleave(e) {
      let ele = e.target
      ele.style.fontSize = '1em'
    },
    allowDrop(e) {
      e.preventDefault()
    }
  }
}
</script>

<style lang="scss" scoped>
  li.active {
    a {
      color: #42b983;
    }
  }
  li {
    padding: 8px 0;

    a {
      color: #4f5959;
    }
  }
</style>
