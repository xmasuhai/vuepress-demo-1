export default {
  data() {
    return {
      // 每一个区域的高度
      codeParent: [],
      codeHeightArr: [],
      // 每个区域的显示状态
      isShow: [],
    }
  },
  methods: {
    // 根据子元素的高度 设置代码区域父元素的高度
    showCode(index) {
      this.$set(this.isShow, index, !this.isShow[index])
      this.$nextTick(() => {
        if (this.isShow[index] === true) {
          this.codeParent[index].style.height =
            + this.codeHeightArr[index] + 'px'
        } else {
          this.codeParent[index].style.height = '0'
        }
        console.log(this.codeParent)
        console.log(this.codeParent[index].style.height)
      })
    },
    // 得到所有代码区域的高度
    getCodesHeight() {
      const arr = document
        .getElementsByClassName('code-content-height')
      this.codeParent = document
        .getElementsByClassName('code-content')
      const arrLength = arr.length
      // console.log(arrLength)
      // console.log(arr)
      // console.log(this.isShow)
      for (let i = 0; i < arrLength; i++) {
        this.codeHeightArr
          .push(arr[i].getBoundingClientRect().height)
        this.isShow.push(false)
      }
    },
  },
  mounted() {
    // 异步获取当前组件内部 code区域的高度 以便于给点击的时候使用
    this.$nextTick(() => {
      this.getCodesHeight()
    })
  },
}
