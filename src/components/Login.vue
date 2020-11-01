<template>
    <div class="loginPage">
        <div class="loginBox">
            <div class="head">
                <div class="title-box">
                    <div class="logo"></div>
                    <!-- <img class="logo" src="../assets/logo.svg" alt="" /> -->

                    <div>
                        <div class="title-up">諮商與臨床心理學系</div>
                        <div class="title-down">教室借用系統</div>
                    </div>
                </div>

                <div class="line"></div>
                <div v-if="$store.state.room.isLoading === true">
                    <img class="loading" src="../assets/logo.svg" alt="" />
                </div>
                <div class="google-login-text">使用GOOGLE帳號登入</div>
            </div>
            <!-- <img
        class="login-button"
        @click="onSuccess"
        src="../assets/login.svg"
        alt=""
      /> -->

            <GoogleLogin :params="params" :onSuccess="onSuccess" :onFailure="onFailure" class="login-container">
                <img class="login-button" src="../assets/login.svg" alt="" />
            </GoogleLogin>
            <!-- <div class="sign-in">
        SIGN IN
      </div> -->
        </div>
    </div>
</template>

<script>
import GoogleLogin from 'vue-google-login'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'login',
    components: {
        GoogleLogin,
    },
    data() {
        return {
            incorrectAuth: false,
            // client_id is the only required property but you can add several more params, full list down bellow on the Auth api section
            params: {
                client_id: '523694584460-tnf9tiocqnob8tgispm7c4pc4n06r18e.apps.googleusercontent.com',
            },
            // only needed if you want to render the button with the google ui
            renderParams: {
                width: 250,
                height: 50,
                longtitle: true,
            },
        }
    },
    methods: {
        ...mapActions(['Login', 'getRoomPage', 'getRoomData']),
        async onSuccess(googleUser) {
            this.$store.state.room.isLoading = true
            // This only gets the user information: id, name, imageUrl and email
            await this.Login(googleUser)
            this.getRoomPage()
            this.$store.state.room.isLoading = false

            // this.get_user_borrow_data(this.$store.state.room.tokens.user_email);
            // this.get_user_borrow_data();
        },
        onFailure(info) {
            console.log(info)
        },
    },
}
</script>

<style scoped>
.loginPage {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
}
.loginBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 355px;
    height: 320px;
    opacity: 0.58;
    border-radius: 45px;
    box-shadow: 0 6px 99px 0 rgba(0, 0, 0, 0.16);
    background-color: #ffffff;
}
.head {
    width: 100%;
}
.title-up {
    width: 167px;
    height: 20px;
    font-size: 18px;
    line-height: 20px;
    color: #96c45a;
    margin: auto;
}
.title-down {
    width: 175px;
    height: 32px;
    font-size: 28px;
    color: #96c45a;
}
.line {
    width: 139.2px;
    height: 0;
    object-fit: contain;
    opacity: 0.38;
    border-top: solid 2px #707070;
    margin: 17.6px auto 27.1px;
}
.google-login-text {
    font-size: 11px;
    text-align: center;
    color: #676a61;
    margin-bottom: 20.5px;
}
.login-container {
    border: solid 0px;
    background-color: white;
}
.login-button {
    width: 146.5px;
    height: 38.5px;
    cursor: pointer;
}
.title-box {
    display: flex;
}
.logo {
    background: url('../assets/logo.svg');
    width: 62px;
    height: 55px;
    margin-left: 47px;
}
</style>
