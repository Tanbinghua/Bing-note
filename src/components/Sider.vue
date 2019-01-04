<template>
  <el-scrollbar
    wrap-class="scrollbar-wrapper"
    style="width: 222px; border-right: 1px solid #e0e1e5;"
  >
    <el-menu
      :default-active="onRoute"
      style="border: none;"
      :collapse-transition="false"
      ref="bingMenu"
      router
    >
      <el-submenu v-for="(group, index) in side" :key="group.id" :index="String(group.id)">
        <template slot="title">
          <i :class="group.title === '我的收藏' ? 'bing-icon-favorite' :  'bing-icon-file1'" v-if="!group.editing"></i>
          <span class="bing-menu" v-if="!group.editing" @dblclick="toggleEditGroup(index)">{{ group.title === '我的文件夹' ? $t('side.file') : group.title === '我的收藏' ? $t('side.favorite') : group.title }}</span>
          <el-dropdown class="bing-dropdown" @command="handleCommand($event, index, group.id)" v-if="!group.editing">
            <i class="el-icon-more el-icon--right"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">{{ $t('side.add') }}</el-dropdown-item>
              <el-dropdown-item command="clear">{{ $t('side.clear') }}</el-dropdown-item>
              <el-dropdown-item command="delete" v-if="group.title !== '我的文件夹' && group.title !== '我的收藏'">{{ $t('side.delete') }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-input
            v-else
            v-model="group.old_title"
            @blur="group.editing = false"
            @keyup.esc.native="group.editing = false"
            @keyup.enter.native="editGroup(group.id, index)"
          ></el-input>
        </template>
        <el-menu-item v-for="(item, idx) in group.item" :key="item.id" :index="String(item.id)" :route="{ path: `/content/${item.id}` }">
          <el-input
            v-if="item.editing"
            v-model="item.old_title"
            @blur="item.editing = false"
            @keyup.esc.native="item.editing = false"
            @keyup.enter.native="editItem(item.id, index, idx)"></el-input>
          <div @dblclick="toggleEditItem(index, idx)" v-else>
            <i class="bing-icon-file"></i>
            <span>{{ item.title }}</span>
          </div>
        </el-menu-item>
        <el-menu-item v-if="group.new" index="new-item" :route="{ path: $route.path }">
          <el-input
            v-model="itemValue"
            autofocus
            :placeholder="$t('side.newItem')"
            @blur="group.new = false"
            @keyup.esc.native="group.new = false"
            @keyup.enter.native="addItem(group.id, index)"
          ></el-input>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="new-group" v-if="newGroup" :route="{ path: $route.path }">
        <el-input
          v-model="groupValue"
          clearable
          autofocus
          :placeholder="$t('side.newGroup')"
          @keyup.esc.native="toggleNew(false)"
          @keyup.enter.native="addGroup"></el-input>
      </el-menu-item>
      <el-menu-item index="trash" :route="{ path: '/trash' }" class="bing-menu-del">
        <i class="el-icon-delete"></i>
        <span slot="title">{{ $t('side.trash') }}</span>
        <el-dropdown class="bing-dropdown" @command="handleTrash">
          <i class="el-icon-more el-icon--right"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="restore">{{ $t('side.restore') }}</el-dropdown-item>
            <el-dropdown-item command="delete">{{ $t('side.delete') }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
    </el-menu>
    <div class="bing-new">
      <el-button type="text" icon="el-icon-plus" style="color: inherit;" @click="toggleNew(!newGroup)">{{ $t('side.new') }}</el-button>
    </div>
  </el-scrollbar>
</template>

<script>
import { getSide, newNote, editNote, clearNote, toggleTrash } from '../utils/api'
import { GlobalBus } from './GlobalBus.js'

export default {
  name: 'side',
  data () {
    return {
      side: [],
      groupValue: '',
      itemValue: '',
      newGroup: false
    }
  },
  computed: {
    onRoute() {
      let route = this.$route.params.uuid
      if (!route) {
        route = this.$route.path.replace('/', '')
      }
      return route
    }
  },
  methods: {
    toggleNew(flag) {
      this.newGroup = flag
      this.groupValue = ''
    },
    addGroup() {
      if (this.groupValue) {
        newNote({ type: 'group', title: this.groupValue, user_id: this.$store.getters.id }).then((data) => {
          data.data.item = []
          this.side.push(data.data)
          this.$message(data.msg)
        })
      }
      this.newGroup = false
      this.groupValue = ''
    },
    addItem(id, index) {
      if (this.itemValue) {
        newNote({ type: 'item', title: this.itemValue, user_id: this.$store.getters.id, group_id: id }).then((data) => {
          this.side[index].item.push(data.data)
          this.$message(data.msg)
        })
      }
      this.$set(this.side[index], 'new', false)
      this.itemValue = ''
    },
    handleCommand(command, index, id) {
      switch(command) {
        case 'add':
          this.$set(this.side[index], 'new', true)
          this.$refs.bingMenu.open(id)
          break
        case 'clear':
          clearNote({ type: 'group', id: this.side[index].id }).then((data) => {
            this.$message(data.msg)
            this.side[index].item = []
            GlobalBus.$emit('updateTrash')
          })
          break
        case 'delete':
          clearNote({ type: 'all', id: this.side[index].id }).then((data) => {
            this.$message(data.msg)
            this.side.splice(index, 1)
            GlobalBus.$emit('updateTrash')
          })
          break
        default:
          break
      }
    },
    handleTrash(command) {
      switch(command) {
        case 'delete':
          toggleTrash({ type: 'all', option: 'delete' }).then((data) => {
            this.$message(data.msg)
            GlobalBus.$emit('updateTrash')
          })
          break
        case 'restore':
          toggleTrash({ type: 'all', option: 'restore' }).then((data) => {
            this.$message(data.msg)
            GlobalBus.$emit('updateTrash')
            this.getData()
          })
          break
        default:
          break
      }
    },
    toggleEditGroup(index) {
      if (index > 1) {
        this.$set(this.side[index], 'old_title', this.side[index].title)
        this.$set(this.side[index], 'editing', true)
      }
    },
    editGroup(id, index) {
      const group = this.side[index]
      if (group.old_title && group.title !== group.old_title) {
        editNote({ type: 'group', title: group.old_title, id }).then((data) => {
          this.$message(data.msg)
          this.$set(this.side[index], 'title', group.old_title)
          this.$set(this.side[index], 'editing', false)
        })
      }
    },
    toggleEditItem(index, idx) {
      this.$set(this.side[index].item[idx], 'old_title', this.side[index].item[idx].title)
      this.$set(this.side[index].item[idx], 'editing', true)
    },
    editItem(id, index, idx) {
      const item = this.side[index].item[idx]
      if (item.old_title && item.title !== item.old_title) {
        editNote({ type: 'item', title: item.old_title, id }).then((data) => {
          this.$message(data.msg)
          this.$set(this.side[index].item[idx], 'title', item.old_title)
          this.$set(this.side[index].item[idx], 'editing', false);
        })
      }
    },
    getData() {
      getSide().then((data) => {
        this.side = data.data
      })
    }
  },
  mounted() {
    this.getData()
    GlobalBus.$on('updateSide', () => {
      this.getData()
    })
  }
}
</script>

<style lang="scss" scoped>
.bing-menu {
  display: inline-block;
  width: 140px;
  &:hover + .bing-dropdown {
    display: block;
  }
}
.bing-menu-del:hover .bing-dropdown {
  display: block;
}
.bing-dropdown, .bing-subdropdown {
  display: none;
  position: absolute;
  line-height: 18px;
  top: 18px;
  right: 33px;
  &:hover {
    display: block;
  }
}
.bing-new {
  line-height: 56px;
  text-align: center;
  border-top: 1px solid rgb(224, 225, 229);
  border-bottom: 1px solid rgb(224, 225, 229);
  transition: all .4s ease;
  &:hover {
    opacity: .8;
  }
}
</style>
