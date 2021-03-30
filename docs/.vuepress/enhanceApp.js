import copy from './common/copy'

export default ({
                  /*
                  Vue,
                  options,
                  router,
                  siteData
                  */
                }) => {
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
