<template>
    <div class="background-canvas">
        <div class="title-box" v-if="$store.state.room.device === 'phone'">
            <div class="title">
                <div class="question"></div>
                <div class="title-text">系統使用說明</div>
            </div>
            <img class="cancel" @click="showQuestion()" src="../assets/cancel.svg" alt="" />
        </div>
        <img
            class="cancel"
            v-if="$store.state.room.device === 'pc'"
            @click="showQuestion()"
            src="../assets/cancel.svg"
            alt=""
        />

        <div class="progress" v-if="$store.state.room.device === 'phone'">
            <div class="step" :class="{ 'current-page-step': this.touch.step === 0 }">1</div>
            <div class="step-line"></div>
            <div class="step" :class="{ 'current-page-step': this.touch.step === 1 }">2</div>
            <div class="step-line"></div>
            <div class="step" :class="{ 'current-page-step': this.touch.step === 2 }">3</div>
            <div class="step-line"></div>
            <div class="step" :class="{ 'current-page-step': this.touch.step === 3 }">4</div>
        </div>
        <div class="modal-wrap" :style="listPositionMove">
            <div class="picture-box">
                <img class="picture" src="../assets/progress/step1.png" alt="" />
                <img class="picture" src="../assets/progress/step2.png" alt="" />
                <img class="picture" src="../assets/progress/step3.png" alt="" />
                <img class="picture" src="../assets/progress/step4.png" alt="" />
            </div>
            <div class="progression-line"></div>
            <div class="text-box">
                <div class="description-box">
                    <div class="description-title">確認人數</div>
                    <div class="description-content">確認會共同使用教室的人數是否大於20人。</div>
                </div>
                <div class="description-box">
                    <div class="description-title">選擇教室</div>
                    <div class="description-content">確認後，選擇符合使用需求的教室。</div>
                </div>
                <div class="description-box">
                    <div class="description-title">選取時間</div>
                    <div class="description-content">
                        請選取欲借用日期，挑選借用時間，並在填上借用事由後送出申請。
                    </div>
                </div>
                <div class="description-box">
                    <div class="description-title">完成借用！</div>
                    <div class="description-content">送出申請後，可至借用紀錄頁面檢視，並在需要時編輯借用申請。</div>
                </div>
            </div>
        </div>
        <div class="ellipse-box">
            <div class="change-page-ellipse" :class="{ 'current-page-ellipse': this.touch.step === 0 }"></div>
            <div class="change-page-ellipse" :class="{ 'current-page-ellipse': this.touch.step === 1 }"></div>
            <div class="change-page-ellipse" :class="{ 'current-page-ellipse': this.touch.step === 2 }"></div>
            <div class="change-page-ellipse" :class="{ 'current-page-ellipse': this.touch.step === 3 }"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'introduction',
    data() {
        return {
            listPositionMove: {
                transform: '',
            },
            touch: {
                startX: 0,
                endX: 0,
                step: 0,
                distance: 0,
            },
        }
    },
    created() {},
    computed: {},
    methods: {
        showQuestion() {
            this.$store.state.room.showQuestion = false
        },
        touchstart(event) {
            this.touch.startX = event.touches[0].clientX
            this.touch.endX = 0
        },
        touchmove(event) {
            this.touch.endX = event.touches[0].clientX
        },
        touchend() {
            if (this.touch.endX === 0) return
            // if (!this.touch.endX || Math.abs(this.touch.endX - this.touch.startX) < 20) return
            if (this.touch.endX - this.touch.startX > 0 && this.touch.step !== 0) {
                this.touch.step = this.touch.step - 1

                this.listPositionMove.transform = 'translateX(-' + parseInt(this.touch.step * 77.5) + 'vw)'
            } else if (this.touch.endX - this.touch.startX < 0 && this.touch.step !== 3) {
                this.touch.step = this.touch.step + 1

                this.listPositionMove.transform = 'translateX(-' + parseInt(this.touch.step * 77.5) + 'vw)'
            } else {
                this.touch.startX = 0
                this.touch.endX = 0
                return
            }
        },
    },
    mounted() {
        this.$el.addEventListener('touchstart', (event) => this.touchstart(event))
        this.$el.addEventListener('touchmove', (event) => this.touchmove(event))
        this.$el.addEventListener('touchend', () => this.touchend())
    },
}
</script>

<style scoped>
.background-canvas {
    width: 1163px;
    height: 547px;
    border-radius: 36px;
    box-shadow: 0 7px 11px 0 rgba(0, 0, 0, 0.16);
    background-color: #ffffff;
    margin: auto;
    padding: 0 53px;
    box-sizing: border-box;
}
.picture-box {
    display: flex;
    box-sizing: border-box;
}
.picture {
    width: 202px;
    height: 202px;
    margin: 48px 33px 38px 33px;
    box-sizing: border-box;
}
.progression-line {
    background: url('../assets/progress/step-line.svg') center;
    width: 863px;
    height: 23px;
    margin: auto;
}
.text-box {
    display: flex;
    width: 100%;
    height: 250px;
    padding-left: 30px;
}
.description-box:nth-child(1) {
    margin-left: 0;
}
.description-box {
    width: 168px;
    height: auto;
    margin: 23px 56px 38px 56px;
}
.description-title {
    text-align: center;
}
.description-title {
    font-size: 20px;
    letter-spacing: 3.5px;
    color: #767676;
}
.description-content {
    font-size: 12px;
    letter-spacing: 2.1px;
    color: #767676;
    text-align: center;
    margin-top: 23px;
    line-height: 2.25;
}
.agree-button {
    width: 170px;
    height: 38px;
    object-fit: contain;
    border-radius: 51px;
    background-color: #b3cd71;
    color: white;
    letter-spacing: 1.71px;
    text-align: center;
    line-height: 38px;
    position: relative;
    float: right;
    cursor: pointer;
}
.cancel {
    position: relative;
    float: right;
    margin-top: 53px;
    cursor: pointer;
}

@media only screen and (max-width: 1024px) {
    .background-canvas {
        width: 78.3vw;
        height: 97.2vw;
        padding: 0px;
        overflow: hidden;
    }
    ::-webkit-scrollbar {
        /*隱藏滾輪*/
        display: none;
    }
    .modal-wrap {
        width: fit-content;
        height: 73%;
        transition: 0.2s;
    }
    .cancel {
        /* margin: 5vw 5vw 0 0; */
        margin: 0;
    }
    .picture {
        width: 39.7vw;
        height: 42.2vw;
        margin: 0 19.05vw;
    }
    .progression-line {
        background-size: 100%;
        visibility: hidden;
    }
    .text-box {
        display: inline-flex;
        padding: 0;
        width: auto;
        /* height: 10vw; */
    }
    .description-box {
        width: 78.3vw;
        margin: 0;
    }
    .description-title {
        width: 31.7;
        margin: auto;
    }
    .description-content {
        width: 46.6vw;
        margin: auto;
        margin-top: 2.77vw;
        line-height: 1.67;
    }
    .ellipse-box {
        width: fit-content;
        display: flex;
        margin: auto;
    }
    .change-page-ellipse {
        width: 2vw;
        height: 2vw;
        border-radius: 50%;
        opacity: 0.4;
        background-color: #767676;
        margin: 0 2.5vw;
    }
    .current-page-ellipse {
        opacity: 0.8;
    }
    .title {
        display: inline-flex;
    }
    .title-box {
        display: flex;
        justify-content: space-between;
        padding: 0 5.5vw;
        margin-top: 5.5vw;
        margin-left: 2vw;
    }
    .question {
        width: 3.88vw;
        height: 3.88vw;
        background: url('../assets/black_question.svg') center;
        background-size: cover;
        margin: auto;
        margin-right: 0.8vw;
    }
    .title-text {
        font-size: 3.8vw;
        letter-spacing: 0.3vw;
        color: #767676;
        line-height: 4vw;
    }
    .progress {
        display: flex;
        justify-content: center;
        margin-top: 4.16vw;
    }
    .step {
        width: 3.88vw;
        height: 3.88vw;
        border-radius: 50%;
        background-color: #1c94ef;
        font-size: 2.2vw;
        color: #fcfcfc;
        text-align: center;
        line-height: 3.88vw;
        margin: auto 0;
    }
    .current-page-step {
        width: 5.63vw;
        height: 5.63vw;
        font-size: 3.3vw;
        line-height: 5.63vw;
    }
    .step-line {
        width: 9vw;
        height: 0;
        border-top: solid 2px #1c94ef;
        margin: auto 1.77vw;
    }
    .progression-line {
        height: 0;
    }
}
</style>
