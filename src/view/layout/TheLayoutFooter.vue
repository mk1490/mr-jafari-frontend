<template>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    name: 'TheLayoutFooter',
    components: {},
    data: () => ({
        icons: [
            'mdi-home',
            'mdi-email',
            'mdi-calendar',
            'mdi-delete',
        ],
    }),
    computed: {
        ...mapGetters([
            'footerShow',
        ]),
    },
    methods: {},
};
</script>
