import copy from './common/copy'
import './public/styles/index.scss'
import 'animate.css'
import anime from 'animejs';

import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/atom-one-dark.css'
export default ({
Vue,
/*
options,
router,
siteData
*/
}) => {
  Vue.use(anime);
  Vue.use(VueHighlightJS);

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
