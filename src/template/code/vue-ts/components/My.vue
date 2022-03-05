<script lang="ts" setup>
import { useLoginInfoStore } from "../store/login"

const loginStore = useLoginInfoStore()
</script>

<template>
  <img src="../assets/logo.png" alt="">
  <h1>pinia 以及持久化缓存使用方案</h1>
  <h3>name：{{ loginStore.name }}</h3>
  <h3>github地址：<a :href="loginStore.address" target="_blank">点击</a></h3>
  <h1>个人网站</h1>
  <iframe src="http://lihh-core.top/" width="100%" height="600px"></iframe>
</template>

<style scoped>

</style>
