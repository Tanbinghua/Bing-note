<template>
  <div id="home">
    <Header />
    <section id="main">
      <Sider />
      <div style="flex: 1;">main</div>
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
  }
}
</script>

<style scoped>
#home {
  height: 100%;
  display: flex;
  flex-direction: column;
}
#main {
  flex: 1;
  display: flex;
}
</style>
