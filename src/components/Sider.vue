<template>
  <el-scrollbar
    wrap-class="scrollbar-wrapper"
    style="width: 222px; border-right: 1px solid #e0e1e5;"
  >
    <el-menu
      default-active="1-1-1"
      @open="handleOpen"
      @close="handleClose"
      style="border: none;"
      unique-opened
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="bing-icon-file1"></i>
          <span class="bing-menu">{{ $t('side.file') }}</span>
          <el-dropdown class="bing-dropdown">
            <i class="el-icon-more el-icon--right"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>新建文件夹</el-dropdown-item>
              <el-dropdown-item>清空</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <el-submenu index="1-1">
          <template slot="title">
            <i class="bing-icon-file1"></i>
            <span class="bing-submenu">新建文件1</span>
            <el-dropdown class="bing-subdropdown">
              <i class="el-icon-more el-icon--right"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>新建文件</el-dropdown-item>
                <el-dropdown-item>清空</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
          <el-menu-item index="1-1-1">
            <i class="bing-icon-file"></i>
            <span class="bing-subitem-title">选项1-1-1</span>
            <i class="el-icon-circle-close el-icon--right bing-del"></i>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="1-2">
          <template slot="title">
            <i class="bing-icon-file1"></i>
            <span class="bing-submenu">新建文件2</span>
            <el-dropdown class="bing-subdropdown">
              <i class="el-icon-more el-icon--right"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>新建文件</el-dropdown-item>
                <el-dropdown-item>清空</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
          <el-menu-item index="1-2-1">
            <i class="bing-icon-file"></i>
            <span class="bing-subitem-title">选项1-2-1</span>
            <i class="el-icon-circle-close el-icon--right bing-del"></i>
          </el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="bing-icon-favorite"></i>
          <span class="bing-menu">{{ $t('side.favorite') }}</span>
          <el-dropdown class="bing-dropdown">
            <i class="el-icon-more el-icon--right"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>全部移除</el-dropdown-item>
              <el-dropdown-item>清空</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <el-menu-item index="2-1">
          <i class="bing-icon-file"></i>
          <span class="bing-item-title">选项1</span>
          <i class="el-icon-circle-close el-icon--right bing-del"></i>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="3" class="bing-menu-del">
        <i class="el-icon-delete"></i>
        <span slot="title" @click="testData">{{ $t('side.trash') }}</span>
        <el-dropdown class="bing-dropdown">
          <i class="el-icon-more el-icon--right"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>彻底删除</el-dropdown-item>
            <el-dropdown-item>全部恢复</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { test } from '../utils/api'

export default {
  name: 'side',
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    testData() {
      test({ email: '123456' }).then((data) => {
        console.log(data)
      })
    }
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
.bing-submenu {
  display: inline-block;
  width: 120px;
  &:hover + .bing-subdropdown {
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
.bing-item-title {
  display: inline-block;
  width: 125px;
  &:hover + .bing-del {
    display: block;
  }
}
.bing-subitem-title {
  display: inline-block;
  width: 105px;
  &:hover + .bing-del {
    display: block;
  }
}
.bing-del {
  display: none;
  position: absolute;
  top: 16px;
  right: 10px;
  &:hover {
    display: block;
  }
}
</style>
