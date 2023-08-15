<template>
    <v-content class="pa-0 full-height align-center">
        <div>
            <image-slider :images="images"></image-slider>
        </div>
    </v-content>
</template>
<script>
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import ImageSlider from "@/view/widgets/ImageSlider.vue";
import {mapGetters} from "vuex";

export default {
    name: "Home",
    components: {ImageSlider},
    computed: {...mapGetters(['images'])},
    async mounted() {
        this.$store.commit('NAVBAR_AND_FOOTER_VISIBILITY_STATE', true);
        await this.prepareInitialize();
    },
    async created() {
        const deviceId = this.$route.query.deviceId;
        const [err, data] = await this.to(this.http.get(`/core/initialize?deviceId=${deviceId}`));
        if (!err) {
            this.informationTimeoutInSeconds = data.informationTimeoutInSeconds * 1000;
        }
    },
    data() {
        return {
            deviceId: null,
        }
    },
    methods: {
        async prepareInitialize() {
            if (!this.$route)
                return;
            const deviceId = this.$route.query.deviceId;
            const [err, data] = await this.to(this.http.get(`/core/initialize?deviceId=${deviceId}`));
            if (!err) {
                await this.$store.commit('SET_HOMEPAGE_RETURN_TIME_SECONDS', data.homePageReturnTimeInSeconds);
                this.$store.commit('SET_MESSAGES', data['messages']);
                this.$store.commit('SET_IMAGES', data.images.map(f => {
                    return this.serverAddress + f;
                }));
            }
        }
    }
}
</script>

<style scoped>
.left {
    /*width: cal!**!c(100% / 1.618);*/
    flex: 3;
    height: 100% !important;
    position: center;
    display: block;

}

.right {
    /*width: auto;*/
    height: 100% !important;
    flex: 1;
}

img {
    height: 100%;
    object-fit: cover;
    background-position: center !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
}

::v-deep.v-image {
    background-size: 100% 100%;
}

.bg-image {
    background-image: url("https://cdn.yjc.ir/files/fa/news/1396/5/12/6577316_992.jpg");
    background-size: cover;
    margin-bottom: 300px !important;
    padding-bottom: 300px !important;
}

</style>