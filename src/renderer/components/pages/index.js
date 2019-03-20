export const RouteMixin = {
    methods: {
        historyBack() {
            this.$router.go(-1)
        }
    }
}