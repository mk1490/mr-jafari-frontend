<template>
    <v-btn
            @click="$emit('click')"
            style="min-height:250px; min-width: 250px;max-width: 100px">
        <div class="d-inline-block">
            <div>
                <v-icon size="125">{{ icon }}</v-icon>
            </div>
            <div class="btn-text">
                <slot></slot>
            </div>
        </div>
    </v-btn>
</template>

<script>
export default {
    name: "IconButton",
    emits: ['click'],
    props: {
        icon: String,
        title: String,
    }
}
</script>

<style scoped>
.btn-text {
    font-family: Iransans !important;
    font-size: 24px;
}
</style>