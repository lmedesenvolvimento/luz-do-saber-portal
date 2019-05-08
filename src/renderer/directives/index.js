import Vue from 'vue'

Vue.directive('focus', {
    // Quando o elemento vinculado é inserido no DOM...
    inserted: function (el) {
        // Coloque o foco no elemento
        el.focus()
    }
})