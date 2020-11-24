<template>
    <div id="app">
        <div class="modal-box slide-top" v-show="$store.state.room.showQuestion === true">
            <introduction />
        </div>
        <sideBar v-if="`${this.$route.name}` !== 'login'" />
        <myNav v-if="`${this.$route.name}` !== 'login' && $store.state.room.isLoading === false"></myNav>
        <loading class="loading-component" v-if="$store.state.room.isLoading === true" />
        <router-view class="router-view" v-show="$store.state.room.isLoading === false" />
        <footer v-if="`${this.$route.name}` === 'login'">
            <div>© 國立東華大學諮商與臨床心理學系｜教室借用系統｜NDHUCCP</div>
        </footer>
    </div>
</template>

<script>
import axios from 'axios'
import myNav from '@/components/myNav'
import sideBar from '@/components/SideBar'
import loading from '@/components/Loading'
import introduction from '@/components/introduction'
import { mapState } from 'vuex'

export default {
    name: 'App',
    components: { myNav, sideBar, loading, introduction },
    data() {
        return {
            router_name: null,
        }
    },
    created() {
        if (window.innerWidth < 1024) {
            this.$store.state.room.device = 'phone'
        } else {
            this.$store.state.room.device = 'pc'
        }
    },
    computed: mapState(['device']),
    mounted() {
        const that = this
        window.onresize = () => {
            return (() => {
                window.innerWidth < 1024
                    ? (this.$store.state.room.device = 'phone')
                    : (this.$store.state.room.device = 'pc')
            })()
        }
    },
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
    text-decoration: none;
    font-family: 'Noto Sans TC', sans-serif;
}

#app {
    color: #2c3e50;
    min-height: 100vh;
    height: 100%;
    min-width: 1200px;
    background-color: #ebde9e;
    overflow: hidden;
    background: url('assets/backgroundImage.svg');
    background-size: cover;
}
body::-webkit-scrollbar {
    display: none;
}
html {
    overflow: -moz-hidden-unscrollable; /*注意！若只打 hidden，chrome 的其它 hidden 會出問題*/
    /* height: 100%; */
    height: auto;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

body {
    height: 100%;
    width: 100vw; /*瀏覽器滾動條的長度大約是 18px*/
    overflow: auto;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.big-logo {
    height: 100%;
    position: fixed;
    right: -160px;
    top: -28px;
}

footer {
    background-color: #7e9a58;
    position: fixed;
    bottom: 0;
    /* min-width: 1200px; */
    width: 100%;
    height: 46px;
    line-height: 46px;
    z-index: 99999;
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

.modal-box {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100%;
    z-index: 1000;
    object-fit: contain;
    background-color: rgba(0, 0, 0, 0.35);
    top: 0;
    left: 0;
    overflow: hidden;
}

@media only screen and (max-width: 1024px) {
    #app {
        width: 100vw;
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
    .router-view {
        margin: auto;
    }
}
</style>
