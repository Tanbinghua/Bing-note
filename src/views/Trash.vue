<template>
  <div id="trash">
    <el-card shadow="hover" v-for="(item, index) in trash" :key="item.id" class="bing-card">
      <div class="trash-list">
        <div class="trash-list-title">
          <p>{{ item.title }}</p>
          <p class="time">{{ $t('content.create') + item.create_time }}</p>
          <p class="time">{{ $t('content.update') + item.update_time }}</p>
        </div>
        <div class="trash-list-icon">
          <el-button type="text" @click="restoreItem(item.id, index)">{{ $t('trash.restore') }}</el-button>
          <el-button type="text" @click="deleteItem(item.id, index)" class="delete">{{ $t('trash.delete') }}</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getTrash, toggleTrash } from '../utils/api'
import { GlobalBus } from '../components/GlobalBus.js'

export default {
  name: 'trash',
  data() {
    return {
      trash: [],
    }
  },
  methods: {
    getData() {
      getTrash().then((data) => {
        this.trash = data.data
      })
    },
    restoreItem(id, index) {
      toggleTrash({ type: 'item', option: 'restore', id }).then((data) => {
        this.$message(data.msg)
        GlobalBus.$emit('updateSide')
        this.trash.splice(index, 1)
      })
    },
    deleteItem(id, index) {
      toggleTrash({ type: 'item', option: 'delete', id }).then((data) => {
        this.$message(data.msg)
        this.trash.splice(index, 1)
      })
    },
  },
  mounted() {
    this.getData()
    GlobalBus.$on('updateTrash', () => {
      this.getData()
    })
  }
}
</script>

<style lang="scss" scoped>
#trash {
  min-width: 700px;
  max-width: 1000px;
  width: 60%;
  margin: 20px auto;
  padding: 0 20px;
}
.bing-card {
  margin-top: 20px;
}
.trash-list {
  display: flex;
  justify-content: space-between;
  &-title {
    line-height: 40px;
  }
  &-icon {
    display: none;
    & .delete {
      color: rgb(245, 108, 108);
    }
  }
  &:hover > &-icon {
    display: block;
  }
  .time {
    font-size: 12px;
    color: #ccc;
    line-height: 20px;
  }
}
</style>
