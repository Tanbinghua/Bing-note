<template>
  <div id="navious" :style="{ backgroundColor: background }">
    <div id="nav_left" title="bing.note.cn">
      bing-note
    </div>
    <div id="nav_right">
      <div id="avatar" title="user">
        <img src="../assets/logo.png" alt="User avatar">
        <el-dropdown class="my-dropdown" trigger="click">
          <i class="el-icon-arrow-down el-icon--right"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>{{ $t('navious.info') }}</el-dropdown-item>
            <el-dropdown-item>{{ $t('navious.feedback') }}</el-dropdown-item>
            <el-dropdown-item>{{ $t('navious.signout') }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <theme-picker class="theme-picker" />
      <lang-select class="international right-menu-item"/>
    </div>
  </div>
</template>

<script>
import ThemePicker from './ThemePicker.vue'
import LangSelect from './LangSelect.vue'

export default {
  name: 'navious',
  data () {
    return {
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
</style>
