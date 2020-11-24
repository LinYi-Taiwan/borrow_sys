<template>
    <div>
        <div v-show="service === 'initial'" class="function-box-content">
            <div class="chat-canvas" @click="select_service('chat')">
                <div class="chat-svg"></div>
                <div>聯絡管理員</div>
            </div>
        </div>
        <!-- two dom is a bad solution ,fixed it later -->
        <div class="modal-box slide-top" v-show="service === 'chat'" v-if="$store.state.room.device === 'phone'">
            <div class="alert-modal">
                <div class="alert-content">
                    <div class="function-box-content">
                        <div class="chat-title">
                            <div @click="select_service('initial')" class="back-svg"></div>
                            <div class="admin-photo"></div>
                            <div class="admin-name">管理員</div>
                        </div>
                        <div class="chat-content" ref="chat-content">
                            <div v-for="(text, index) in textBox" :key="index">
                                <div class="text-area">{{ text }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="chat-input">
                        <textarea
                            @keydown.enter.exact.prevent
                            @keydown.enter="sendMessage()"
                            v-model="message"
                            placeholder="輸入問題..."
                        ></textarea>
                        <div ref="send" @click="sendMessage()" class="submit-svg"></div>
                    </div>
                </div>
            </div>
        </div>

        <div
            v-show="service === 'chat'"
            class="function-box-content slide-top"
            v-if="$store.state.room.device === 'pc'"
        >
            <div class="chat-title">
                <div @click="select_service('initial')" class="back-svg"></div>
                <div class="admin-photo"></div>
                <div class="admin-name">管理員</div>
            </div>
            <div class="chat-content" ref="chat-content">
                <div v-for="(text, index) in textBox" :key="index">
                    <div class="text-area">{{ text }}</div>
                </div>
            </div>
            <div class="chat-input">
                <textarea
                    @keydown.enter.exact.prevent
                    @keydown.enter="sendMessage()"
                    v-model="message"
                    placeholder="輸入問題..."
                ></textarea>
                <div ref="send" @click="sendMessage()" class="submit-svg"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios'
export default {
    name: 'chat',
    data() {
        return {
            message: '',
            textBox: [],
            service: 'initial',
        }
    },
    methods: {
        ...mapActions(['sendMessageToAdmin']),
        select_service(service) {
            this.service = service
        },
        async sendMessage(e) {
            if (this.message === '') return
            this.textBox.push(this.message)
            console.log(this.$refs['send'])
            this.$refs['send'].classList.add('rotate')
            await this.sendMessageToAdmin(this.$store.state.room.tokens.user_name + '向管理員詢問：' + this.message)
            this.$refs['send'].classList.remove('rotate')

            this.message = ''
        },
        scrollToBottom() {
            this.$refs['chat-content'].scrollTop = this.$refs['chat-content'].scrollHeight
        },
    },
    updated() {
        this.scrollToBottom()
    },
}
</script>

<style scoped>
.function-box-content {
    width: 100%;
    height: 100%;
    padding: 0 26px;
    box-sizing: border-box;
}

.chat-svg {
    width: 30px;
    height: 30px;
    background: url('../assets/admin.svg') center;
    background-size: cover;
    cursor: pointer;
}
.back-svg {
    width: 10.5px;
    height: 16.5px;
    background: url('../assets/back.svg') center;
    background-size: cover;
    cursor: pointer;
    margin: auto 0;
}
.admin-photo {
    width: 27px;
    height: 27px;
    background: url('../assets/admin_photo.svg') center;
    background-size: cover;
    margin-left: 27.4px;
}
.chat-title {
    display: flex;
    padding-top: 17.5px;
}
.admin-name {
    margin: 5px 0 5px 5px;
    font-size: 11px;
    letter-spacing: 1.21px;
    color: #707070;
}
.chat-content {
    width: 100%;
    height: 60%;
    display: flex;
    flex-direction: column;
    overflow: scroll;
}
.chat-content::-webkit-scrollbar {
    display: none;
}
.chat-input {
    width: 378px;
    height: 35px;
    margin: 11.4px 0 0;
    padding: 9px 0 9px 23.5px;
    border-radius: 30px;
    box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.24);
    background-color: #ffffff;
    box-sizing: border-box;
    display: flex;
}
textarea {
    opacity: 0.3;
    resize: none;
    font-size: 15px;
    letter-spacing: 1.31px;
    border: none;
    border-left: 2px solid #afafa5;
    padding-left: 9.6px;
    box-sizing: border-box;
    line-height: 100%;
    width: 88%;
    overflow: hidden;
}
textarea:focus {
    outline-width: 0;
}
.submit-svg {
    background: url('../assets/submit.svg') center;
    width: 13.9px;
    height: 13.9px;
    background-size: cover;
    margin: auto;
    cursor: pointer;
}
.rotate {
    -webkit-animation: spin 1s linear infinite;
    -moz-animation: spin 1s linear infinite;
    animation: spin 1s linear infinite;
}
@-moz-keyframes spin {
    100% {
        -moz-transform: rotate(360deg);
    }
}
@-webkit-keyframes spin {
    100% {
        -webkit-transform: rotate(360deg);
    }
}
@keyframes spin {
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
.text-area {
    /* background: url('../assets/text_area.svg') space;
    background-size: contain; */
    width: fit-content;
    max-width: 148px;
    word-wrap: break-word;
    height: auto;
    padding: 9px 16px 9px 17px;
    box-sizing: border-box;
    background-color: #ebdc82;
    border-radius: 30px;
    color: #707070;
    line-height: 1.82;
    float: right;
    font-size: 11px;
    margin: 3.8px 13px 3.8px 0;
    text-align: left;
}

.modal-box {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100%;
    z-index: 1000;
    top: 0;
    left: 0;
    background: url('../assets/backgroundImage.svg') center;
    background-size: cover;
}
.alert-modal {
    position: fixed;
    width: 86vw;
    height: 100%;
    height: auto;
    opacity: 0.89;
    border-radius: 10px;
    background-color: #ffffff;
}
.alert-content {
    text-align: center;
    width: 100%;
    letter-spacing: 1.71px;
    color: #686b63;
}
.alert-title {
    font-size: 16px;
    margin: 17px 0 13px 0;
}
.alert-text {
    font-size: 14px;
    margin-bottom: 20px;
}
.chat-canvas {
    width: 80px;
    height: 70px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.chat-canvas div {
    text-align: center;
    margin: auto;
    font-size: 12px;
    letter-spacing: 3.32px;
}

.slide-top {
    -webkit-animation: slide-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    animation: slide-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@-webkit-keyframes slide-top {
    0% {
        -webkit-transform: translateX(20px);
        transform: translateX(20px);
    }
    100% {
        -webkit-transform: translateX(0px);
        transform: translateX(0px);
    }
}
@keyframes slide-top {
    0% {
        -webkit-transform: translateX(20px);
        transform: translateX(20px);
    }
    100% {
        -webkit-transform: translateX(0px);
        transform: translateX(0px);
    }
}

@media only screen and (max-width: 1024px) {
    .function-box-content {
        padding: 0;
        margin: auto;
        height: 75vh;
    }
    .chat-canvas {
        width: auto;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .chat-canvas div {
        text-align: center;
        margin: auto;
        font-size: 2.77vw;
        letter-spacing: 0;
    }
    .chat-content {
        height: 81%;
    }
    .chat-title {
        padding-left: 6.4vw;
        padding-top: 6vw;
    }
    .admin-photo {
        margin-left: 5vw;
        width: 7.5vw;
        height: 7.5vw;
    }
    .admin-name {
        font-size: 3.6vw;
    }
    .chat-input {
        width: 74.7vw;
        height: 11.6vw;
        margin: auto;
        padding: 2.5vw 0 2.5vw 8.47vw;
        margin-bottom: 5vw;
        box-sizing: border-box;
    }
    textarea {
        line-height: inherit;
        font-size: 4.16vw;
    }
    .submit-svg {
        width: 4.86vw;
        height: 4.86vw;
        margin-right: 6.2vw;
    }
    .back-svg {
        width: 3.9vw;
        height: 6.16vw;
    }
    .chat-svg {
        margin: auto;
        width: 8.3vw;
        height: 8.3vw;
        margin-top: 5.27vw;
    }
    .function-box-content div {
        font-size: 2.77vw;
        text-align: center;
        line-height: 8.3vw;
    }
    .text-area {
        max-width: 42.5vw;
    }
}
</style>
