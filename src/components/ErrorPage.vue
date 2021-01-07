<template>
    <div class="error-page">
        <div class="error-box">
            <div class="error-text"></div>
            <div class="error-first-text">糟糕！似乎有地方出錯了！</div>
            <div class="error-second-text">您的網址可能是錯誤的。</div>
            <div @click="go_home()" class="to-home">點此返回主頁</div>
        </div>
    </div>
</template>

<script>
import router from '@/router/router'

export default {
    name: 'ErrorPage',
    methods: {
        go_home() {
            router.push('/home')
        },
    },
}
</script>

<style>
.error-page {
    background: url('../assets/404.svg') center;
    width: 100%;
    height: 100vh;
    min-width: 1200px;
    margin: 0;
    top: 0;
    position: absolute;
    background-size: cover;
    z-index: 10000;
}
.error-text {
    background: url('../assets/404text.svg') center;
    width: 261.5px;
    height: 99.2px;
    background-size: cover;
    margin: 116px 0 0 257px;
}
.error-box {
    width: fit-content;
    margin-left: 257px;
    margin-top: 116px;
}
.error-box div {
    margin: auto;
    text-align: center;
    color: #707070;
}
.error-first-text {
    margin-top: 26.5px !important;
    font-size: 24px;
    letter-spacing: 2.64px;
}
.error-second-text {
    margin-top: 5px !important;
    font-size: 15px;
    letter-spacing: 1.65px;
}
.to-home {
    margin-top: 19px !important;
    width: 122px;
    height: 31px;
    box-shadow: 1px 3px 6px 0 rgba(0, 0, 0, 0.16);
    background-color: #ffffff;
    border-radius: 16px;
    font-size: 13px;
    line-height: 31px;
    cursor: pointer;
}
@media only screen and (max-width: 1024px) {
    .error-page {
        min-width: 100vw;
        max-height: 100vh;
        height: 100%;
        background: url('../assets/404mobile.svg') center;
        background-size: cover;
        box-sizing: border-box;
        padding-top: 27.7vw;
    }
    .error-first-text {
        margin-top: 26.5px !important;
        font-size: 4.4vw;
        letter-spacing: 2.64px;
    }
    .error-second-text {
        margin-top: 5px !important;
        font-size: 2.77vw;
        letter-spacing: 1.65px;
    }
    .error-box {
        margin: auto;
    }
}
</style>
