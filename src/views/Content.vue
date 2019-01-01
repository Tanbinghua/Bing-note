<template>
  <div id="note">
    <Tinymce />
  </div>
</template>

<script>
import Tinymce from '../components/Tinymce/index.vue'

export default {
  name: 'note',
  data() {
    return {}
  },
  components: {
    Tinymce,
  },
}
</script>

<style>
#note {
  min-width: 700px;
  max-width: 1000px;
  width: 60%;
  margin: 20px auto;
}
</style>
