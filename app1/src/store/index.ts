import { createPinia, defineStore } from "pinia";
import type { App } from "vue"
import { useAppStore } from './app';
import { useUserStore } from './user';
export const useStore = defineStore({
  id: "useStore",
  state() {
    return {
      count: 1,
      ...useUserStore()
    }
  }
})

export function setupStore(app: App<Element>) {

  app.use(createPinia())
}