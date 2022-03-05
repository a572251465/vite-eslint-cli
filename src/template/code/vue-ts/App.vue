<script setup lang="ts">
import { useRouter } from "vue-router"

const router = useRouter()

const skipPage = (path: string) => {
  router.push({ path })
}
</script>

<template>
  <div class="container">
    <span @click="skipPage('/')">pinia使用</span>
    <span @click="skipPage('/hello')">hello vue3</span>
  </div>
  <div class="carrier">
    <router-view></router-view>
  </div>
</template>

<style>

.container {
  height: 40px;
  border-bottom: 1px solid #ccc;
  box-shadow: 3px 3px 3px #ccc;
  display: flex;
  justify-content: center;
}

span {
  font-weight: bold;
  font-size: 20px;
  margin: 0 20px;
  cursor: pointer;
}

span:hover {
  color: blue;
}

.carrier {
  text-align: center;
}
</style>
