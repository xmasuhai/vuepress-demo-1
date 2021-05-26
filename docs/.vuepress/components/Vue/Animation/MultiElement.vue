<template>
  <div>
    <h2>Toggle "Save" & "Edit"</h2>
    <transition name="fadeSwitch" mode="out-in">
      <button :key="isEditing" @click="isEditing = ! isEditing">
        {{ isEditing ? 'Save' : 'Edit' }}
      </button>
    </transition>
    <hr>
    <h2>Toggle "Save" & "Edit" & "Cancel"</h2>
    <transition name="fadeSwitch" mode="out-in">
      <button :key="docState" @click="switchingDocState">
        {{ buttonMessage }}
      </button>
    </transition>
    <hr>
    <h2>Mode in-out</h2>
    <hr>
    <div class="pose">
      <transition name="carousel" mode="in-out">
        <button :key="docState" @click="switchingDocState">
          {{ buttonMessage }}
        </button>
      </transition>
    </div>
    <h2>Toggle Carousel with no mode</h2>
    <div class="pose">
      <transition name="carousel">
        <button :key="docState" @click="switchingDocState">
          {{ buttonMessage }}
        </button>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Slide',
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
    }
  }
}
</script>

<style lang="scss" scoped>
.fadeSwitch-enter-active, .carousel-enter-active {
  transition: all .3s ease;
}

.fadeSwitch-leave-active, .carousel-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.fadeSwitch-enter, .fadeSwitch-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.carousel-enter {
  transform: translateX(100px);
  opacity: 0;
}

.carousel-leave-to {
  transform: translateX(-150px);
  opacity: 0;
}

.pose {
  position: relative;
  padding: 100px;

  > button {
    position: absolute;
  }
}
</style>
