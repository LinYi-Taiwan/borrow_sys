<template>
    <div :class="{ sideBar: showBar }">
        <introduction v-if="showQuestion" />
        <div class="mobile-selection" v-show="!showBar" @click="mobileShowBar()"></div>
        <div class="nav" :style="mobileBar_style">
            <div class="mobile-selection-cancel" :class="{ invisible: !showBar }" @click="mobileShowBar()"></div>

            <div class="sideBar-up" @click="mobileShowBar()">
                <router-link to="/home">
                    <div class="router-container">
                        <div class="home"></div>
                        <div>主頁</div>
                    </div>
                </router-link>
                <router-link to="/allRooms">
                    <div class="router-container">
                        <div class="key"></div>
                        <div>教室借用</div>
                    </div>
                </router-link>
            </div>

            <div class="sideBar-down" @click="mobileShowBar()">
                <a @click="logout()">
                    <div class="router-container">
                        <div class="logout"></div>
                        <div>系統登出</div>
                    </div>
                </a>
                <a @click="question()">
                    <div class="router-container">
                        <div class="question"></div>
                        <div>借用流程</div>
                    </div>
                </a>
            </div>
        </div>
        <div class="mask" @click="mobileShowBar()" v-show="showBar"></div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import introduction from './introduction.vue'

export default {
    name: 'SideBar',
    components: { introduction },
    data() {
        return {
            showQuestion: false,
            showBar: false,
            mobileBar_style: {},
        }
    },
    created() {
        if (window.innerWidth <= 1024) {
            this.mobileBar_style = {
                visibility: 'hidden',
                width: '0',
            }
        }
    },
    methods: {
        ...mapActions(['logout']),
        question() {
            this.$store.state.room.showQuestion = !this.$store.state.room.showQuestion
        },

        mobileShowBar() {
            if (this.$store.state.room.device === 'phone') {
                this.showBar = !this.showBar
                this.showBar === false
                    ? (this.mobileBar_style.visibility = 'hidden') && (this.mobileBar_style.width = '0')
                    : (this.mobileBar_style.visibility = 'visible') && (this.mobileBar_style.width = '50vw')
            }
        },
    },
    computed: {
        device() {
            return this.$store.state.room.device
        },
    },
    watch: {
        device: function() {
            this.mobileBar_style = {}
        },
    },
    mounted() {},
}
</script>

<style scoped>
.sideBar {
    position: fixed;
    z-index: 1000;
}
.nav {
    display: flex;
    position: fixed;
    flex-direction: column;
    justify-content: center;
    background-color: #b1ca70;
    float: left;
    width: 55px;
    height: 100vh;
    border-top-right-radius: 8px;
    box-shadow: 5px 0 18px 0 rgba(0, 0, 0, 0.16);
    transition: 0.2s;
    overflow-x: hidden;
    z-index: 1000;
}
.nav a {
    display: block;
    text-decoration: none;
    color: white;
    font-size: 12px;
    text-shadow: 6px 6px 8px rgba(0, 0, 0, 0.16);
    letter-spacing: 1.7px;
    cursor: pointer;
}
.nav a:hover {
    background-color: rgba(255, 255, 255, 0.2);
    /* opacity: 0.5; */
}
.nav:hover {
    transition: 0.2s;
    width: 134px;
    z-index: 1000;
}
.router-container {
    /* display: flex; */
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    margin: 24px 0 24px 0;
}
.home {
    background: url('../assets/home.svg') center;
    background-size: cover;
    width: 28.1px;
    height: 21.9px;
    margin: 0 16px 0 15px;
}
.key {
    width: 26.7px;
    height: 27.3px;
    background: url('../assets/key.svg') center;
    background-size: cover;
    margin: 0 20.3px 0 13.1px;
}

.question {
    width: 21px;
    height: 21px;
    background: url('../assets/question.svg') center;
    background-size: cover;
    margin: 0 20px 0 19px;
}
.logout {
    width: 23.9px;
    height: 20.2px;
    cursor: pointer;
    background: url('../assets/logout.svg') center;
    background-size: cover;
    margin: 0 17px 0 20px;
}
.contain {
    display: flex;
    justify-content: space-between;
    padding-top: 30px;
    padding-left: 39px;
}
.sideBar-text {
}

.sideBar-up {
    display: flex;
    margin-top: 15vh;
    flex-direction: column;
}
.sideBar-down {
    display: flex;
    flex-direction: column-reverse;
    margin-bottom: 11vh;
}
@media only screen and (max-width: 1024px) {
    .nav {
        display: block;
        background-color: transparent;
        /* overflow: hidden; */
        box-shadow: none;
        width: 0;
        background-color: #7e9a58;
    }
    .mobile-selection {
        background: url('../assets/mobile_selection.svg') center;
        background-size: cover;
        width: 6.1vw;
        height: 2.5vw;
        margin: 7.2vw 0 0 5vw;
        position: absolute;
    }
    .mobile-selection-cancel {
        background: url('../assets/close.svg') center;
        width: 6.1vw;
        height: 6.1vw;
        margin: 6.7vw 0 0 7vw;
        background-size: cover;
    }
    .invisible {
        visibility: hidden;
        width: 6.1vw;
        height: 6.1vw;
        margin: 6.7vw 0 0 7vw;
        background-size: cover;
    }
    a {
        display: flex;
        justify-content: center;
    }
    .mask {
        background-color: rgba(0, 0, 0, 0.16);
        width: 100vw;
        height: 100vh;
    }
    .sideBar-up {
        margin-top: 5vh;
        margin-left: 2.5vw;
    }
    .sideBar-down {
        margin-left: 2.5vw;
    }
    .home {
        width: 7.8vw;
        height: 6vw;
        margin: 0 4.44vw 0 4.16vw;
    }
    .key {
        width: 7.41vw;
        height: 7.58vw;
        margin: 0 5.63vw 0 3.63vw;
    }

    .question {
        width: 5.83vw;
        height: 5.83vw;
        margin: 0 5.63vw 0 5.5vw;
    }
    .logout {
        width: 6.67vw;
        height: 5.61vw;
        margin: 0 4.72vw 0 5.63vw;
    }
}
</style>
