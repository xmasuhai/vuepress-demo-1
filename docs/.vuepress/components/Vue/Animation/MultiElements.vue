<template>
  <div>
    <multi-element-template title="Toggle 2 elements"
                            animationName="fadeSwitch"
                            animationMode="out-in"
                            :buttonKey="isEditing"
                            :buttonMessage="isEditing ? 'Save' : 'Edit'"
                            :eventFn="toggle"
                            class="twoElements"
    ></multi-element-template>
    <multi-element-template title="Toggle 3 elements with mode out-in"
                            animationName="fadeSwitch"
                            animationMode="out-in"
                            :buttonKey="docState"
                            :buttonMessage="buttonMessage"
                            :eventFn="switchingDocState"
                            class="twoElements"
    ></multi-element-template>
    <multi-element-template title="Toggle 3 elements with mode in-out"
                            animationName="carousel"
                            animationMode="in-out"
                            :buttonKey="docState"
                            :buttonMessage="buttonMessage"
                            :eventFn="switchingDocState"
                            class="threeElements"
    ></multi-element-template>
    <multi-element-template title="Toggle Carousel with no mode"
                            animationName="carousel"
                            :buttonKey="docState"
                            :buttonMessage="buttonMessage"
                            :eventFn="switchingDocState"
                            class="threeElements"
    ></multi-element-template>
  </div>
</template>

<script>
import MultiElementTemplate from "./MultiElementTemplate";

export default {
  name: 'MultiElements',
  components: {MultiElementTemplate},
  data() {
    return {
      isEditing: true,
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
    },
    toggle() {
      this.isEditing = !this.isEditing
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

.threeElements::v-deep {
  .pose {
    position: relative;
    padding: 100px;

    &>button {
      position: absolute;
    }
    .carousel-enter-active {
      transition: all .3s ease;
    }
    .carousel-leave-active {
      transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .carousel-enter {
      background: red;
      transform: translateX(100px);
      opacity: 0;
    }
    .carousel-leave-to {
      transform: translateX(-150px);
      opacity: 0;
    }
  }
}

</style>
