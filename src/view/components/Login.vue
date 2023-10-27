<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex align-self-center>
        <div class="d-flex justify-center">
          <v-card
              class="justify-center"
              width="500">
            <v-card-title>
              <div class="d-flex justify-center text-center">
                <div class="d-inline-block">
                  <div>
                    <h2>
                      پنل مدیریتی سامانه هوشمند نظرسنجی
                    </h2>
                  </div>
                  <div class="justify-center text-center text-wrap mt-3">
                    <span>برای ورود به حساب کاربری، نام کاربری و کلمۀ عبور خود را وارد نمایید.</span>
                  </div>
                </div>
              </div>
            </v-card-title>
            <v-card-text>
              <v-container class="container--fluid pa-0">
                <div class="row">
                  <div class="col-12">
                    <v-text-field
                        clearable
                        class="text-center"
                        hide-details="auto"
                        dense
                        dir="ltr"
                        maxlength="50"
                        outlined
                        v-model="model.username"
                        :label="$t('authentication.username')"
                    />
                  </div>
                  <div class="col-12">
                    <v-text-field
                        class="text-center"
                        dense
                        maxlength="50"
                        outlined
                        :type="passwordVisible? 'normal': 'password'"
                        :append-icon="passwordVisible? 'mdi-eye-off': 'mdi-eye'"
                        @click:append="passwordVisible =!passwordVisible"
                        hide-details="auto"
                        dir="ltr"
                        v-model="model.password"
                        :label="$t('authentication.password')"
                    />
                  </div>
                </div>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn
                  @click="login"
                  color="green"
                  class="col-12 white--text"
                  block>
                {{ $t('authentication.login') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Alizreaza from "@/view/components/Test";

export default {
  name: "Login",
  components: {Alizreaza},
  async created() {
    console.log(await (this.$store.dispatch('isAuth')))
    if (await (this.$store.dispatch('isAuth'))) {

      await this.$router.push('/');
    }
  },
  data() {
    return {
      passwordVisible: false,
      model: {
        username: 'Mamad',
        password: '',
      }
    }
  },
  methods: {
    async login() {
      const [err, data] = await this.to(this.http.post(`/auth/login`, this.model));
      if (!err) {
        sessionStorage.setItem('Authorization', data.access_token);
        await this.$store.dispatch('setSessionId', data.sessionId)
        await this.$router.push('/Admin');
        // await this.$store.dispatch('initProfile');
      } else {
        await this.$store.dispatch('setSessionId', null)
      }
    }
  }
}
</script>

<style scoped>
span {
  font-family: "IranSans";
  font-size: 1.3rem;;
}

.background {
  z-index: -1 !important;
  height: 100vh;
  width: 100%;
  filter: blur(10px) brightness(0.5);
  /*background-image: url('@/assets/login-bg.jpg');*/
  /*background-image: url('@/assets/login-bg-2.jpg');*/
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  grid-column: 1/-1;
  grid-row: 1/-1;
}

.content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
