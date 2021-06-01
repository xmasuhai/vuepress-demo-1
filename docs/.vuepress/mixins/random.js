export default {
  methods: {
    randomIndex() {
      return Math.floor(Math.random() * this.itemList.length)
    },
    add() {
      this.itemList.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove() {
      this.itemList.splice(this.randomIndex(), 1)
    },
    recover() {
      this.itemList = [...this.originItems]
    },
    oddEven() {
      ((10 - Math.floor(Math.random() * 10)) % 2 === 0) ?
        (this.add()) :
        (this.remove())
    },
    checkItemList() {
      if (this.itemList.length === 0) {
        this.itemList.push(0)
        this.recover()
      }
    },
  },
  watch: {
    itemList: {
      handler: 'checkItemList',
    }
  },
  created() {
    this.originItems = [...this.itemList]
  },
}
