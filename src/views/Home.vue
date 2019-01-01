<template>
  <div id="home">
    <Header />
    <section id="main">
      <Sider />
      <el-scrollbar style="flex: 1;">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-scrollbar>
    </section>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Sider from '../components/Sider.vue'

export default {
  name: 'home',
  components: {
    Header,
    Sider,
  },
}
</script>

<style scoped lang="scss">
#home {
  height: 100%;
  display: flex;
  flex-direction: column;
}
#main {
  flex: 1;
  display: flex;
  /deep/ .el-scrollbar__wrap {
    overflow-y: scroll;
    overflow-x: hidden;
  }
}
</style>
