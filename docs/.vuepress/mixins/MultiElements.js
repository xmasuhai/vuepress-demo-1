import MultiElementTemplate from "../components/Vue/Animation/MultiElementTemplate.vue";
export default {
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
