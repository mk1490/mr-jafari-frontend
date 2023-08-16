export default {

    methods: {
        async checkHasNationalCode(closeableModal) {
            if (!!this.$store.getters.userNationalCode) {
                return Promise.resolve();
            }
            return this.openNationalCodeSelector(closeableModal)
        },
        openNationalCodeSelector(closeableModal) {
            return new Promise((resolve, reject) => {
                this.$swal.fire({
                    icon: 'question',
                    text: 'جهت شرکت در نظرسنجی، لطفا کد ملّی خود را در فیلد ذیل وارد نمایید.',
                    input: 'tel',
                    inputAttributes: {
                        maxlength: 10,
                        pattern: "[0-9]{10}"
                    },
                    allowOutsideClick: closeableModal || true
                }).then(async ({isConfirmed, value}) => {
                    if (isConfirmed) {
                        if (!!value) {
                            this.$store.commit('SET_NATIONAL_CODE', value)
                            resolve(value)
                        } else {
                            await this.checkHasNationalCode(closeableModal)
                            reject();
                        }
                    } else {
                        this.$swal.fire({
                            icon: 'warning',
                            text: 'ورود کد ملّی اجباری است!'
                        });
                        reject()
                    }
                })
            })
        }
    }
}