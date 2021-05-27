<template>
  <div>
    <multi-element-template title="Toggle 3 elements with mode out-in"
                            animationName="fadeSwitch"
                            animationMode="out-in"
                            :buttonKey="docState"
                            :buttonMessage="buttonMessage"
                            :eventFn="switchingDocState"
                            class="twoElements"
    ></multi-element-template>
  </div>
</template>

<script>
import MultiElementTemplate from "./MultiElementTemplate";

export default {
  name: "MultiElements3elements",
  components: {MultiElementTemplate},
  data() {
    return {
      docStateList: ['saved', 'edited', 'editing'],
      docState: 'saved',
      tempList: [],
      stateCount: 0
    }
  },
  computed: {
    buttonMessage: {
      get: function () {
        return {
          'saved': 'Edit',
          'edited': 'Save',
          'editing': 'Cancel',
        }[this.docState]
      },
      set: function (state) {
        this.docState = state
      }
    }
  },
  beforeMount() {
    this.tempList = [...this.docStateList]
  },
  methods: {
    switchingDocState() {
      this.docState = this.tempList.pop();
      if (this.tempList.length === 0) {
        this.tempList = [...this.docStateList]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.twoElements::v-deep {
  .fadeSwitch-enter-active, {
    transition: all .3s ease;
  }

  .fadeSwitch-leave-active, {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .fadeSwitch-enter, .fadeSwitch-leave-to {
    transform: translateY(20px);
    opacity: 0;
  }
}

</style>
