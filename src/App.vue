<template>
    <div id="app">
        <sideBar class="sideBar" v-if="`${this.$route.name}` !== 'login'" />
        <myNav v-if="`${this.$route.name}` !== 'login' && $store.state.room.isLoading === false"></myNav>
        <loading class="loading-component" v-if="$store.state.room.isLoading === true" />
        <router-view class="router-view" v-show="$store.state.room.isLoading === false" />
        <footer>
            <div>© 國立東華大學諮商與臨床心理學系｜教室借用系統｜NDHUCCP</div>
        </footer>
    </div>
</template>

<script>
import axios from 'axios'
import myNav from '@/components/myNav'
import sideBar from '@/components/SideBar'
import loading from '@/components/Loading'
export default {
    name: 'App',
    components: { myNav, sideBar, loading },
    data() {
        return {
            router_name: null,
        }
    },
    created() {
        console.log(process.env)
    },
    mounted() {},
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC&display=swap');
html,
body,
div,
span,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
pre,
a,
img,
i,
li,
form,
label,
legend,
table,
tr,
th,
td,
footer,
header,
audio,
video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    z-index: 99;
    text-decoration: none;
    font-family: 'Noto Sans TC', sans-serif;
}

#app {
    color: #2c3e50;
    height: 100vh;
    min-width: 1200px;
    background-color: #ebde9e;
    overflow: auto;
    background: url('assets/backgroundImage.svg');
    background-size: cover;
}
body::-webkit-scrollbar {
    display: none;
}
html {
    overflow: -moz-hidden-unscrollable; /*注意！若只打 hidden，chrome 的其它 hidden 會出問題*/
    height: 100%;
}

body {
    height: 100%;
    width: 100vw; /*瀏覽器滾動條的長度大約是 18px*/
    overflow: auto;
}
.big-logo {
    height: 100%;
    position: fixed;
    right: -160px;
    top: -28px;
}
.sideBar {
    position: absolute;
    z-index: 1000;
}
footer {
    background-color: #7e9a58;
    position: fixed;
    bottom: 0;
    min-width: 1200px;
    width: 100%;
    height: 46px;
    line-height: 46px;
}
footer div {
    display: flex;
    justify-content: center;
    width: 100%;
    color: white;
    font-size: 13px;
    margin: auto;
}
.loading-component {
    width: 100%;
    height: 100%;
}
.router-view {
    /* height: calc(100% - 177px); */
    margin-bottom: 100px;
    margin-left: 58px;
}
@media only screen and (max-width: 1200px) {
    #app {
        width: 100vw;
        height: 100%;
        min-width: 0;
    }
    footer {
        min-width: 0px;
        height: 12.7vw;
        line-height: 12.7vw;
    }
    footer div {
        font-size: 3.2vw;
        width: auto;
        text-align: center;
    }
}
</style>
