import { defineStore } from "pinia"

const useLoginInfoStore = defineStore("loginInfoStore", {
  state: () => {
    return {
      // github name
      name: "lihh",
      // github 地址
      address: "https://github.com/a572251465"
    }
  },

  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        // 此处设置缓存方式 按字段缓存
        paths: ["address"]
      }
    ]
  }
})

export { useLoginInfoStore }
