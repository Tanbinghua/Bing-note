<template>
  <div id="note">
    <div class="note-header">
      <el-button type="primary" size="small" @click="saveItem">{{ $t('note.save') }}</el-button>
      <h3 class="title">{{ title }}</h3>
      <el-button type="danger" size="small" @click="deleteItem">{{ $t('note.delete') }}</el-button>
    </div>
    <Tinymce v-model="content" ref="richContent" />
    <div class="note-bottom">
      <p class="time">{{ $t('content.create') + create_time }}</p>
      <p class="time">{{ $t('content.update') + update_time }}</p>
    </div>
  </div>
</template>

<script>
import Tinymce from '../components/Tinymce/index.vue'
import { GlobalBus } from '../components/GlobalBus.js'
import { clearNote, getContent, editContent } from '../utils/api'

export default {
  name: 'note',
  data() {
    return {
      id: '',
      content: '',
      title: '',
      create_time: '',
      update_time: '',
    }
  },
  components: {
    Tinymce,
  },
  watch: {
    '$route.params'() {
      this.getData()
    }
  },
  methods: {
    saveItem() {
      editContent({ id: this.id, content: this.content }).then((data) => {
        this.$message(data.msg)
      })
    },
    deleteItem() {
      clearNote({ type: 'item', id: this.$route.params.uuid }).then((data) => {
        this.$message(data.msg)
        this.$router.push('/')
        GlobalBus.$emit('updateSide')
      })
    },
    getData(init) {
      getContent(this.$route.params.uuid).then((data) => {
        const { id, title, content, create_time, update_time } = data.data
        this.id = id
        this.title = title
        this.content = content
        this.create_time = create_time
        this.update_time = update_time
        if (!init) {
          if (this.content) {
            this.$refs.richContent.setContent(this.content)
          } else {
            this.$refs.richContent.setContent('')
          }
        }
      })
    }
  },
  mounted() {
    this.getData(true)
  }
}
</script>

<style lang="scss" scoped>
#note {
  min-width: 700px;
  max-width: 1000px;
  width: 60%;
  margin: 20px auto;
}
.note-header {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  & .title {
    line-height: 32px;
    font-size: 16px;
    font-weight: bold;
  }
}
.note-bottom {
  float: right;
  margin-top: 10px;
  & .time {
    font-size: 12px;
    color: #ccc;
    margin-bottom: 5px;
  }
}
</style>
