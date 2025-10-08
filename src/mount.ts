import { createPinia } from "pinia"
import { createApp } from "vue"
import App from "./App.vue"

import { PROVIDE_OMNIS_COMPONENT_ID } from "./global"

// Shared imports
import "./shared"

// App factory for binding to all elements that use the class "omnis-vue"
export function mountApp(id: any, elem: any) {
  const pinia = createPinia()
  const app = createApp(App)

  app.provide(PROVIDE_OMNIS_COMPONENT_ID, id)

  app.use(pinia)
  app.mount(elem)
}
