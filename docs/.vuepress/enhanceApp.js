import copy from './common/copy'
import VueHighlightJS from 'vue-highlight.js'
import 'highlight.js/styles/dark.css'
import './public/styles/index.scss'

export default ({
                  Vue,
                  /*
                  options,
                  router,
                  siteData
                  */
                }) => {
  Vue.use(VueHighlightJS)
  setTimeout(() => {
    // 对document的判断是防止编译的时候报错
    try {
      document && (() => {
        copy()
      })()
    } catch (e) {
      console.error(e.message)
    }
  }, 500)
}
