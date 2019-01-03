<template>
  <div id="index">
    <div id="center">
      <h1 id="title" :style="{ color: $store.getters.theme }">Bing-Note</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  created() {
    this.$store.dispatch('getUserInfo')
  }
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "Permanent Marker";
  src: url("../assets/PermanentMarker-Regular.ttf");
}
#index {
  height: 100%;
  width: 100%;
  position: absolute;
}
#center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#title {
  font-family: 'Permanent Marker', cursive;
  font-size: 50px;
  user-select: none;
}
</style>
