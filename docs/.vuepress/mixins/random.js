export default {
  methods: {
    randomIndex() {
      return Math.floor(Math.random() * this.items.length)
    },
    add() {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove() {
      this.items.splice(this.randomIndex(), 1)
    },
    oddEven() {
      ((10 - Math.floor(Math.random() * 10)) % 2 === 0 )?
        (this.add()): (this.remove())
    }
  }
}
