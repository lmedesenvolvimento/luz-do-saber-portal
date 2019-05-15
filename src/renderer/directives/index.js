import Vue from 'vue'

Vue.directive('focus', {
    inserted: function (el, binding) {
        if (binding.value) {
            el.focus()
        }
    }
})