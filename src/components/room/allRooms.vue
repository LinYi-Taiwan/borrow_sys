<template>
    <div>
        <div class="modal-box slide-top" v-show="delete_alert">
            <div class="alert-modal">
                <img class="cancel" @click="delete_alert = false" src="../../assets/cancel.svg" alt="" />
                <div class="alert-content">
                    <div class="alert-title">{{ select_room_info.name }}</div>
                    <div class="img-box">
                        <img v-for="i in 6" :key="i" class="room-img" src="../../assets/testimg.jpg" alt="" />
                    </div>
                    <div class="rule">
                        <div>
                            使用規範：test
                        </div>
                        <div>教室器材：test</div>
                        <div>教室狀態：test</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="page"></div>
        <div class="contain">
            <div class="room-box" v-for="(i, index) in room_page" :key="index">
                <div class="box" @click="openButton(i.name + index)">
                    <div class="room-text">
                        <div class="room-svg"></div>
                        <div class="room-name">{{ i.name }}</div>
                        <div class="room-describe">地點：{{ i.location }}</div>
                        <div class="room-describe">可容納人數：{{ i.contain_num }}</div>
                    </div>
                    <div class="button-box" :ref="i.name + index">
                        <router-link class="room-borrow" :to="'/allRooms/' + i.name">
                            <div class="borrow-svg"></div>
                        </router-link>
                        <div
                            @click="
                                delete_alert = true
                                select_room_info = i
                            "
                            class="room-info"
                        >
                            <div class="info-svg"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'allRooms',
    data() {
        return {
            room_page: [
                { name: 'test1', location: 'test1', contain_num: 'testNum' },
                { name: 'test1', location: 'test1', contain_num: 'testNum' },
            ],
            delete_alert: false,
            select_room_info: {},
        }
    },

    computed: {},
    methods: {
        ...mapActions(['getRoomPage']),
        openButton(room_name) {
            this.$refs[room_name][0].style.display = 'flex'
        },
    },
    async created() {
        this.$store.state.room.isLoading = true
        await this.getRoomPage()
        this.room_page = this.$store.state.roomPage
        this.$store.state.room.isLoading = false
    },
    mounted() {},
}
</script>

<style scoped>
.box {
    display: flex;
    width: 226px;
    height: 108px;
    background-color: #fffdfd;
    border-radius: 7px;
    filter: drop-shadow(2px 4px 10px rgba(0, 0, 0, 0.3));
    /* padding: 13px 19.5px; */
    padding-left: 46px;
    box-sizing: border-box;
    opacity: 0.85;
    transition: 0.5s;
    position: absolute; /*safari 需要補position*/
}
.box:hover .button-box {
    display: flex;
}
.box:hover {
    padding-left: 6px;
}
.contain {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 924px;
    margin: auto;
}
.room-box {
    margin-right: 123px;
    margin-bottom: 65px;
    width: 226px;
    height: 108px;
}
.room-box:nth-child(3n) {
    margin-right: 0;
}
.room-text {
    width: auto;
    height: auto;
    color: #686b63;
    text-decoration: none;
    margin: auto 0;
    text-align: left;
    letter-spacing: 1.28px;
    white-space: nowrap;
    overflow: hidden;
}

.room-name {
    width: 134px;
    font-size: 18px;
    margin-bottom: 13px;
}
.room-describe {
    width: 134px;
    font-size: 12px;
    margin-bottom: 4px;
}
.room-svg {
}
.page-text {
    width: 300px;
    height: 40px;
    text-shadow: 6px 6px 8px rgba(0, 0, 0, 0.16);
    font-size: 27px;
    letter-spacing: 2.89px;
    margin-left: 7px;
    color: #ffffff;
}
.page {
    display: flex;
    width: 300px;
    margin: 0.95vw 0 4.6vw 15.15vw;
}
.room-info {
    display: flex;
    justify-content: center;
    align-items: center;
    visibility: hidden;
    transition: 0.5s;
    width: 0px;
    height: 100%;
    background-color: #7e9a58;
    font-size: 0px;
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
    cursor: pointer;
}
.room-borrow {
    display: flex;
    justify-content: center;
    align-items: center;
    visibility: hidden;
    transition: 0.5s;
    width: 0px;
    height: 100%;
    background-color: #b0ca70;
    background-size: cover;
    font-size: 0px;
}
.box:hover .room-borrow {
    width: 44px;
    visibility: visible;
}
.box:hover .room-info {
    width: 44px;
    visibility: visible;
}
.box:hover .borrow-svg {
    visibility: visible;
}
.box:hover .info-svg {
    visibility: visible;
}
.button-box {
    visibility: hidden;
    display: flex;
    height: 100%;
    right: 0;
    position: absolute;
}

.borrow-svg {
    width: 23px;
    height: 21.3px;
    background: url('../../assets/borrow.svg') center;
    background-size: cover;
    visibility: hidden;
}
.info-svg {
    width: 20px;
    height: 20px;
    background: url('../../assets/info.svg') center;
    background-size: cover;
    visibility: hidden;
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
}
.alert-modal {
    position: absolute;
    width: 377px;
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

.check-submit {
    width: 243px;
    height: 36px;
    border-radius: 51px;
    background-color: red;
    font-size: 18px;
    letter-spacing: 1.93px;
    text-align: center;
    margin: 0 auto;
    color: white;
    line-height: 36px;
    margin-top: 37px;
    margin-bottom: 37px;
    cursor: pointer;
}
.check-submit:hover {
    background-color: #7e9a58;
}
.cancel {
    position: absolute;
    right: 0;
    margin: 21.3px 21.3px 0 0;
    cursor: pointer;
}

.room-img {
    width: 104px;
    height: 104px;
    margin: 0 2px;
    border-radius: 2px;
}
.slide-top {
    -webkit-animation: slide-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    animation: slide-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
.rule div {
    width: 277px;
    text-align: left;
    font-size: 14px;
    letter-spacing: 1.5px;
    color: #686b63;
    margin: 26px auto;
}
@-webkit-keyframes slide-top {
    0% {
        -webkit-transform: translateY(100px);
        transform: translateY(100px);
    }
    100% {
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
    }
}
@keyframes slide-top {
    0% {
        -webkit-transform: translateY(100px);
        transform: translateY(100px);
    }
    100% {
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
    }
}
@media only screen and (max-width: 1024px) {
    .page {
        margin-left: 5.8vw;
    }
    .key-svg {
        width: 5.7vw;
        height: 5.36vw;
        margin: auto;
    }
    .page-text {
        font-size: 4.72vw;
        height: 6.9vw;
        line-height: 6.9vw;
    }
    .contain {
        width: 100%;
        height: auto;
        justify-content: flex-start;
    }
    .room-box {
        width: 37vw;
        height: 43.6vw;
        margin: 0;
        margin-left: 9.4vw;
        margin-bottom: 2.77vw;
    }
    .box {
        width: 37vw;
        height: 43.6vw;
        border-radius: 7.77vw;
        padding: 0;
    }
    .box:hover {
        padding-left: 0;
    }
    .room-text {
        margin: 0;
    }
    .room-name {
        font-size: 2.5vw;
        text-align: center;
        margin-bottom: 2.2vw;
        width: auto;
    }
    .room-describe {
        font-size: 1.94vw;
        text-align: center;
        margin-bottom: 1.6vw;
        width: auto;
    }
    .room-svg {
        background: url('../../assets/2people.png') center;
        background-size: cover;
        width: 36.6vw;
        height: 26.4vw;
    }
    .button-box {
        width: 100%;
        height: 0;
        border-top-right-radius: 7.77vw;
        border-top-left-radius: 7.77vw;
        top: 0;
    }
    .box:hover .room-borrow {
        width: 18.47vw;
        height: 26.1vw;
        border-top-left-radius: 7.77vw;
        border-bottom-left-radius: 0;
    }
    .box:hover .room-info {
        width: 18.47vw;
        height: 26.1vw;
        border-top-right-radius: 7.77vw;
        border-bottom-right-radius: 0;
    }
    .room-borrow {
        width: 18.47vw;
        border-top-left-radius: 7.77vw;
    }
    .room-info {
        width: 18.47vw;
        border-top-right-radius: 7.77vw;
    }
    .alert-modal {
        width: 90vw;
    }
    .room-img {
        width: 26vw;
        height: 26vw;
    }
}
</style>
