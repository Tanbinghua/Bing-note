<template>
  <div class="error">
    <div class="utility-page-wrap">
      <div class="utility-page-content">
        <h1 class="title">404</h1>
        <h2>Page not found</h2>
        <div>The page you are looking for doesn&#x27;t exist or has been moved.</div>
        <el-button type="primary" @click="$router.push('/')" style="margin-top: 20px;">Back to index</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.utility-page-wrap {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100vw;
  height: 100vh;
  max-height: 100%;
  max-width: 100%;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}
.utility-page-content {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 260px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  text-align: center;
}
.title {
  font-size: 40px;
}
</style>
