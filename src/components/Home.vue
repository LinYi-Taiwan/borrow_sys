<template>
    <div class="background-canvas">
        <div class="canvas-left">
            <div class="box welcome">
                <div class="hello-text">Hi， {{ $store.state.room.tokens.user_name }}！</div>
                <div class=" hello-text-second">歡迎來到教室借用系統！</div>

                <div class="button-box">
                    <div class="welcome-button">
                        <router-link to="/allRooms">
                            教室借用
                        </router-link>
                    </div>
                    <div class="welcome-button" @click="question()">使用說明</div>
                </div>
            </div>

            <chat class="box function-box" />

            <record class="btn-block record" />
        </div>

        <div v-if="$store.state.room.device === 'pc'" class="box room-situation">敬請期待</div>
    </div>
</template>

<script>
import record from './Record'
import chat from './chat'
export default {
    name: 'home',
    components: {
        record,
        chat,
    },
    data() {
        return {}
    },
    methods: {
        question() {
            this.$store.state.room.showQuestion = !this.$store.state.room.showQuestion
        },
    },
}
</script>

<style scoped>
.background-canvas {
    display: flex;
    width: fit-content;
    height: auto;
    /* margin: auto; */
}
.canvas-left {
    width: 810px;
    height: auto;
    display: flex;
    flex-wrap: wrap;
}
.welcome {
    width: 305px;
    height: 256px;
    margin: 45px 0 9px 131px;
    letter-spacing: 0.34px;
    font-size: 18px;
    color: #767676;
    box-shadow: 0 10px 12px 0 rgba(0, 0, 0, 0.16);
    background: url('../assets/welcome.png') center;
    background-size: cover;
    position: relative;
}
.box {
    border-radius: 30px;
    background-color: #ffffff;
    opacity: 0.8;
    margin: 18px;
    box-sizing: border-box;
}

.function-box {
    width: 430px;
    height: 256px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
}
.room-situation {
    width: 265px;
    height: 567px;
    text-align: center;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
}
.record {
    margin-left: 18px;
}
.welcome-button {
    width: 122px;
    height: 53px;
    border-radius: 15px;
    box-shadow: 0.5vw 0.5vw 2.2vw 0 rgba(0, 0, 0, 0.16);
    background-color: #ffffff;
    line-height: 53px;
    font-size: 18px;
    text-align: center;
}
.welcome-button a {
    text-decoration: none;
    color: #707070;
    cursor: pointer;
}
.hello-text {
    margin-left: 30px;
    margin-top: 9.5px;
}
.hello-text-second {
    margin-left: 30px;
    font-size: 13px;
}
.button-box {
    width: 100%;
    margin-bottom: 21px;
    display: flex;
    position: absolute;
    bottom: 0;
    justify-content: space-evenly;
}

@media only screen and (max-width: 1024px) {
    .background-canvas {
        width: 78.3vw;
        height: 100%;
        padding: 0px;
        overflow: hidden;
    }

    .canvas-left {
        width: 100%;
        height: fit-content;
    }
    .box {
        border-radius: 4.16vw;
        margin: 0;
        opacity: 1;
    }
    .welcome {
        width: 83.7vw;
        height: 53.3vw;
        margin: 0;
        padding: 0;
        padding-top: 2.6vw;
        text-align: left;
        margin-top: 6.1vw;
    }
    .function-box {
        width: 22.5vw;
        height: 22.5vw;
        border-radius: 3.05vw;
        margin-top: 8.27vw;
        margin-right: 8vw;
    }
    .hello-text {
        margin-left: 8.3vw;
        font-family: NotoSansTC;
        font-size: 5vw;
        letter-spacing: 0.5vw;
        text-align: left;
        color: #707070;
        margin-top: 0;
    }
    .hello-text-second {
        margin-left: 8.3vw;
        font-size: 3.61vw;
        letter-spacing: 0.5vw;
    }
    .button-box {
        margin-bottom: 5.7vw;
    }
    .welcome-button {
        width: 33.8vw;
        height: 13.3vw;
        border-radius: 4.16vw;
        box-shadow: 0.5vw 0.5vw 2.2vw 0 rgba(0, 0, 0, 0.16);
        background-color: #ffffff;
        line-height: 13.3vw;
        font-size: 5vw;
        text-align: center;
    }
    .btn-block {
        width: 22.5vw;
        height: 22.5vw;
        border-radius: 3.05vw;
        margin-top: 8.27vw;
        margin-right: 8vw;
        border-radius: 3.05vw;
        background-color: #ffffff;
        box-sizing: border-box;
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
        margin-bottom: 1vw;
    }
    .record {
        margin-left: 0;
    }
}
</style>
