<template>
  <el-scrollbar
    wrap-class="scrollbar-wrapper"
    style="width: 222px; border-right: 1px solid #e0e1e5;"
  >
    <div class="new">
      <el-button type="text" icon="el-icon-plus">{{ $t('side.new') }}</el-button>
    </div>
    <el-menu
      default-active="1-1-1"
      @open="handleOpen"
      @close="handleClose"
      style="border: none;"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="bing-icon-file1"></i>
          <span>{{ $t('side.file') }}</span>
        </template>
        <el-submenu index="1-1">
          <template slot="title">
            <i class="bing-icon-file1"></i>
            <span>选项1</span>
          </template>
          <el-menu-item index="1-1-1">
            <i class="bing-icon-file"></i>
            <span>选项1-1</span>
          </el-menu-item>
          <el-menu-item index="1-1-2">
            <i class="bing-icon-file"></i>
            <span>选项1-2</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="1-2">
          <template slot="title">
            <i class="bing-icon-file1"></i>
            <span>选项2</span>
          </template>
          <el-menu-item index="1-2-1">
            <i class="bing-icon-file"></i>
            <span>选项2-1</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="1-3">
          <i class="bing-icon-file"></i>
          <span>选项3</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="2">
        <i class="bing-icon-favorite"></i>
        <span slot="title">{{ $t('side.favorite') }}</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-delete"></i>
        <span slot="title">{{ $t('side.trash') }}</span>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'side',
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style lang="scss" scoped>
.new {
  line-height: 60px;
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 1px #fff;
}
</style>
