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
  methods: {
    switchingDocState() {
      this.docState = this.docStateList.pop();
      if(this.docStateList.length === 0) {
        this.docStateList = ['saved', 'edited', 'editing']
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fadeSwitch-enter-active {
  transition: all .3s ease;
}

.fadeSwitch-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.fadeSwitch-enter, .fadeSwitch-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
