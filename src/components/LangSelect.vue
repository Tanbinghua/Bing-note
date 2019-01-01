<template>
  <el-dropdown trigger="click" @command="handleCommand" class="language-select" title="i18n">
    <span class="el-dropdown-link">
    {{ language === 'zh' ? '中文' : 'English' }}<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language==='zh'" command="zh">中文</el-dropdown-item>
      <el-dropdown-item :disabled="language==='en'" command="en">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { setInfo } from '../utils/api'

export default {
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  methods: {
    handleCommand(lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('setLanguage', lang)
      localStorage.setItem('language', lang)
      setInfo({ language: lang }).then(() => {
        this.$message({
          message: 'Switch Language Success',
          type: 'success'
        })
      })
    }
  },
}
</script>

<style scoped>
.language-select {
  margin: 22px 0;
  cursor: pointer;
  color: #ffff;
}
</style>
