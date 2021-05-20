import GlobalLoading from './GlobalLoading.vue'

export default {
  install:(app) => {
    app.component(GlobalLoading.name,GlobalLoading)
  }
}