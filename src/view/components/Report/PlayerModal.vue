<template>
    <v-dialog
            persistent
            v-model="visible">
        <v-card>
            <v-card-text>
                <v-container>
                    <video id="videoPlayer" controls></video>

                    {{ options.video.url }}
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="close">
                    بستن
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "PlayerModal",
    components: {
    },
    created() {
        // this.options.video.url = this.data;
        // console.log(this.options.video.url);
    },
    mounted() {
        // this.videoPlayer = this.$refs.videoPlayer.dp;
    },
    data() {
        return {
            videoPlayer: null,
            options: {
                video: {
                    url: null,
                    type: 'customHls',
                    customType: {}
                }
            }

        }
    },
    props: {
        visible: Boolean,
        data: String,
    },
    methods: {
        close() {
            this.$emit('update:visible', false);
        },
        play() {

        },
        seeked() {
        }
    }
}
</script>

<style scoped>

</style>