<template>
  <div id="navious" :style="{ backgroundColor: background }">
    <div id="nav_left" title="bing.note.cn">
      bing-note
    </div>
    <div id="nav_right">
      <div id="avatar" title="user">
        <img src="../assets/logo.png" alt="User avatar">
        <el-dropdown class="my-dropdown" trigger="click" @command="handleCommand">
          <i class="el-icon-arrow-down el-icon--right"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="info">{{ $t('navious.info') }}</el-dropdown-item>
            <el-dropdown-item command="help">{{ $t('navious.feedback') }}</el-dropdown-item>
            <el-dropdown-item command="logout">{{ $t('navious.signout') }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <theme-picker class="theme-picker" />
      <lang-select class="international right-menu-item"/>
    </div>
    <el-dialog
      :title="$t('navious.title')"
      :visible.sync="dialogVisible"
      width="400px">
      <div>
        <p class="info"><span class="label">ID: </span><span class="text">{{ $store.getters.id }}</span></p>
        <p class="info"><span class="label">{{ $t('navious.name') + ': ' }}</span><span class="text">{{ $store.getters.name }}</span></p>
        <p class="info"><span class="label">Email: </span><span class="text">{{ $store.getters.email }}</span></p>
        <p class="info"><span class="label">{{ $t('content.create') + ': ' }}</span><span class="text">{{ $store.getters.create_time }}</span></p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="dialogVisible = false">{{ $t('navious.sure') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ThemePicker from './ThemePicker.vue'
import LangSelect from './LangSelect.vue'
import { signOut } from '../utils/api'

export default {
  name: 'navious',
  data () {
    return {
      dialogVisible: false,
    }
  },
  computed: {
    background() {
      return this.$store.getters.theme
    }
  },
  components: {
    ThemePicker,
    LangSelect,
  },
  methods: {
    handleCommand(command) {
      switch(command) {
        case 'logout':
          signOut().then((data) => {
            this.$message(data.msg)
            this.$store.dispatch('logOut')
            this.$router.push('/login')
          })
          break
        case 'help':
          window.open('https://github.com/Tanbinghua/Bing-note')
          break
        case 'info':
          this.dialogVisible = true
          break
        default:
          break
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "Permanent Marker";
  src: url("../assets/PermanentMarker-Regular.ttf");
}
#navious {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  background-color: #409EFF;
}
#nav_left {
  font-family: 'Permanent Marker', cursive;
  font-size: 30px;
  user-select: none;
  line-height: 60px;
  color: #fff;
}
#avatar {
  & img {
    vertical-align: middle;
    cursor: pointer;
    margin: 9px 0;
    height: 40px;
    width: 40px;
    &:hover {
      opacity: 0.8;
    }
  }
  & .my-dropdown {
    cursor: pointer;
    color: #fff;
  }
}
#nav_right {
  display: flex;
  & .theme-picker {
    margin: 10px 20px;
  }
}
.info {
  margin-top: 10px;
  font-size: 14px;
  & .label {
    display: inline-block;
    width: 100px;
    text-align: right;
    margin-right: 10px;
  }
  & .text {
    display: inline-block;
  }
}
</style>
