<template>
    <div id="themes-box">
        <b-row class="mx-4 p-2 header-unit" :style="{ backgroundColor: themeColor }"> 
            <h2 class="unit-title">{{ unit.title }}</h2>
        </b-row>
        <b-row class="unit-body" :style="{ backgroundColor: themeColor }">
            <b-col class="unit-info px-4 pt-3">
                <b-row class="px-3"><h3>ATIVIDADES:</h3></b-row>
                <b-row class="px-3 py-1 activities-completed">0/5</b-row>
                <b-row class="pt-2 mx-1 line" />
                <b-row class="px-3 pt-2 pb-3 stars">
                    <b-col class="star" />
                    <b-col class="star" />
                    <b-col class="star" />
                </b-row>
            </b-col>
            <b-col class="pt-4 container-unit-image"> 
                <div class="unit-image" />
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    props: {
        unit: {
            type: Object,
            require: true
        },
        themeColor: {
            type: String
        }
    },
    methods: {

    }
}
</script>
<style>

</style>
