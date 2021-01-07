<template>
    <div>
        <div class="modal-box" v-if="delete_alert">
            <div class="alert-modal">
                <img class="cancel" @click="delete_alert = false" src="../assets/cancel.svg" alt="" />
                <div class="alert-content">
                    <div class="alert-title">確認取消借用？</div>
                    <div class="alert-text">
                        <!-- 借用時段：{{ start_time.time }}~{{ end_time.time }} -->
                    </div>
                    <div class="check-submit" @click="cancelBorrow()">
                        確定取消！
                    </div>
                </div>
            </div>
        </div>

        <div @click="show_modal = true" v-if="$store.state.room.device === 'phone'">
            <div class="record-svg"></div>
            <div class="button-text">借用紀錄</div>
        </div>

        <div class="record-modal-box slide-top" v-show="show_modal" v-if="$store.state.room.device === 'phone'">
            <div class="record-alert-modal">
                <div class="record-alert-content">
                    <div class="navbar">
                        <div @click="show_modal = false" class="back-svg"></div>
                        <div>
                            <textarea v-model="search_text" placeholder="輸入關鍵字..." />
                        </div>
                        <div class="button-box">
                            <div class="drop" @click="show_button = !show_button">
                                <div>
                                    {{ this.select_option[this.select_field] }}
                                </div>
                                <div class="drop-svg"></div>
                            </div>
                            <div v-if="show_button" class="drop-selection">
                                <div v-for="(item, key) in select_option" :key="key" @click="field_search(key)">
                                    {{ select_option[key] }}
                                </div>
                                <!-- <div @click="select_field = 'room'">搜教室</div>
                                <div @click="select_field = 'borrow_reason'">搜事由</div> -->
                            </div>
                        </div>
                    </div>

                    <div
                        @click="showReason(index)"
                        class="borrow-record-box"
                        :class="{ 'borrow-record-extend': target_index === index }"
                        v-for="(i, index) in dataSearch"
                        :ref="'box' + index"
                        :key="index"
                    >
                        <div class="record-left">
                            <div class="borrow-record">
                                <div class="date-circle">
                                    <div class="mobile-month">{{ mobileBorrowDay(i.start_time).month }}</div>
                                    <div>/</div>
                                    <div class="mobile-day">{{ mobileBorrowDay(i.start_time).day }}</div>
                                </div>
                                <div class="mobile-nav">
                                    <div class="mobile-room">{{ i.room }}</div>
                                    <div class="mobile-time">{{ borrowTime(i.start_time, i.end_time) }}</div>
                                </div>
                            </div>
                            <div :ref="index + 'reason'" v-show="target_index === index" class="mobile-reason">
                                借用事由：{{ i.borrow_reason }}
                            </div>
                        </div>
                        <div
                            class="mobile-edit-box"
                            v-if="target_index === index && recordStatus(i.start_time, i.end_time) === 'overtime'"
                        >
                            <img src="../assets/overtime.svg" alt="" />
                        </div>
                        <div
                            :ref="index + 'cancel'"
                            v-if="target_index === index && recordStatus(i.start_time, i.end_time) === 'undue'"
                            @click="edit(i, index)"
                            class="mobile-edit-box"
                        >
                            <div class="mobile-delete"></div>
                            <div>刪除</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="$store.state.room.device === 'pc'">
            <div>
                <table class="table-title">
                    <tr>
                        <th @click="selectSearchField('room')">借用教室</th>
                        <th @click="selectSearchField('borrow_reason')">借用事由</th>
                        <th @click="selectSearchField('start_time')">借用日期</th>
                        <th>借用時段</th>
                        <th>狀態</th>
                    </tr>
                </table>
            </div>

            <div class="table-box-content table-box">
                <table>
                    <tr v-for="(i, index) in dataSearch" :key="index">
                        <td ref="room">{{ i.room }}</td>
                        <td ref="borrow_reason">{{ i.borrow_reason }}</td>
                        <td ref="start_time">{{ borrowDay(i.start_time) }}</td>
                        <td ref="time">{{ borrowTime(i.start_time, i.end_time) }}</td>
                        <td ref="status">
                            <div class="status-img">
                                <img
                                    v-if="recordStatus(i.start_time, i.end_time) === 'undue'"
                                    @click="edit(i)"
                                    class="undue"
                                    src="../assets/undue.svg"
                                    alt=""
                                />
                                <img
                                    v-if="recordStatus(i.start_time, i.end_time) === 'overtime'"
                                    src="../assets/overtime.svg"
                                    alt=""
                                />
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'Record',
    data() {
        return {
            select_delete_data: [],
            search_text: '',
            delete_alert: false,
            cancel_index: '',
            show_modal: false,
            target_index: '',
            show_button: false,
            select_field: 'room',
            select_option: { room: '搜教室', borrow_reason: '搜事由' },
        }
    },
    async created() {
        await this.get_user_borrow_data(this.$store.state.room.tokens.user_email)
        console.log(this.$store.state.room.userData.data)
    },
    computed: {
        dataSearch() {
            if (this.search_text === '') return this.$store.state.room.userData.data
            console.log(this.select_option[this.select_field])
            return this.$store.state.room.userData.data.filter((data) =>
                data[this.select_field].includes(this.search_text)
            )
        },
    },
    methods: {
        ...mapActions(['get_user_borrow_data', 'delete_user_borrow_data']),
        borrowDay(timeField) {
            return timeField.split('T')[0]
        },
        mobileBorrowDay(timeField) {
            return {
                month: (new Date(timeField).getMonth() + 1).toString().padStart(2, 0),
                day: new Date(timeField)
                    .getDate()
                    .toString()
                    .padStart(2, 0),
            }
        },
        borrowTime(start_time, end_time) {
            let start = `${new Date(start_time).getHours()}:${new Date(start_time)
                .getMinutes()
                .toString()
                .padEnd(2, 0)}`

            let end = `${new Date(end_time).getHours()}:${new Date(end_time)
                .getMinutes()
                .toString()
                .padEnd(2, 0)}`

            return `${start} - ${end}`
        },
        recordStatus(start_time, end_time) {
            let today = new Date()
            let start = new Date(start_time)
            if (today - start > 0) return 'overtime'
            if (today - start < 0) return 'undue'
        },
        edit(edit_data, index) {
            this.cancel_index = 'box' + index
            this.select_delete_data = edit_data
            this.delete_alert = true
        },
        cancelBorrow() {
            if (this.$store.state.room.device === 'phone') {
                this.$refs[this.cancel_index][0].classList.add('record-clear')
            }
            this.$store.state.room.userData.data = this.$store.state.room.userData.data.filter(
                (element) =>
                    element.borrower === this.select_delete_data.borrower &&
                    element.start_time !== this.select_delete_data.start_time &&
                    element.end_time !== this.select_delete_data.end_time
            )
            this.delete_user_borrow_data(this.select_delete_data)
            this.delete_alert = false
        },
        selectSearchField(field) {
            // let is_select = this.$refs[field].some(
            //   element => element.classList[0] === "select"
            // );
            if (this.select_field !== '') {
                this.$refs[this.select_field].forEach((element) => element.classList.remove('select'))
            }
            this.select_field = field
            this.$refs[this.select_field].forEach((element) => element.classList.add('select'))
        },
        showReason(index) {
            this.target_index === index ? (this.target_index = '') : (this.target_index = index)
        },
        field_search(key) {
            this.select_field = key
            this.show_button = false
        },
    },
    mounted() {},
}
</script>

<style scoped>
.test:nth-child(2) {
    background-color: gray;
}
.page {
    display: flex;
    align-items: center;
    margin: 0.95vw 0 4.6vw 13.54vw;
}
.page-text {
    width: 300px;
    height: 42px;
    text-shadow: 6px 6px 8px rgba(0, 0, 0, 0.16);
    font-size: 27px;
    letter-spacing: 2.89px;
    color: #ffffff;
    margin-left: 8px;
}
table {
    width: 771px;
    height: auto;
    max-height: 275px;
    border: solid 2.5px white;
    border-collapse: separate;
    border-spacing: 0;
}
td,
th {
    width: 100px;
    height: 50px;
    /* word-wrap: break-word; */
    color: #686b63;
    text-align: center;
    border: solid 2.5px rgb(255, 255, 255, 1);
    vertical-align: middle;
    max-width: 100px;
    text-overflow: ellipsis;
    padding: 0 10px 0 10px;
}
th {
    border-bottom: solid 0;
    position: sticky;
    top: 0;
    height: 33px;
    text-align: center;
    line-height: 33px;
    background-color: rgb(255, 255, 255, 0.5);
    font-size: 17px;
    padding: 2.5px;
    letter-spacing: 1.82px;
}
.table-box {
    margin: auto;
    max-height: 225px;
    width: 771px;
    overflow: hidden;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border-bottom: solid 5px rgb(255, 255, 255, 1);
}
.table-box-content {
    margin-bottom: 50px;
}
.table-title {
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
}
.table-box:hover {
    overflow-y: auto;
    overflow-x: hidden;
}
textarea {
    background: url('../assets/search.svg') no-repeat scroll center transparent;
    position: relative;
    margin-left: 30px;
    float: right;
    width: 225px;
    height: 31px;
    border: solid 3px white;
    border-radius: 31px;
    background-color: rgb(255, 255, 255, 0.3);
    resize: none;
    font-size: 14px;
    padding-left: 50px;
    letter-spacing: 1.31px;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
}
::placeholder {
    color: white;
}
textarea:focus {
    outline: none;
}
.borrow-name {
    color: #686b63;
    position: relative;
    top: 20px;
    letter-spacing: 1.82px;
    width: 300px;
}
.status-img {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.undue {
    transition: 0.3s;
}
.undue:hover {
    transform: scale(1.2, 1.2);
    transition: 0.3s;
    cursor: pointer;
}
.record-svg {
    filter: drop-shadow(2px 4px 10px rgba(0, 0, 0, 0.3));
    width: 20.4px;
    height: 24.5px;
    background: url('../assets/record.svg') center;
    background-size: cover;
}

.modal-box {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    z-index: 1001;
}
.alert-modal {
    position: absolute;
    width: 414px;
    opacity: 0.85;
    border-radius: 22px;
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
    margin: 46px 0 48px 0;
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
.select {
    background-color: #b3cd71;
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
    .record-svg {
        width: 7.6vw;
        height: 9vw;
        background: url('../assets/home_record.svg') center;
        background-size: cover;
        margin: auto;
        margin-top: 4.27vw;
    }
    .button-text {
        font-size: 2.77vw;
        text-align: center;
        margin-top: 2vw;
    }
    .function-box {
        margin-top: 9vw;
    }
    .record-modal-box {
        position: absolute;
        display: flex;
        justify-content: center;
        width: 100vw;
        z-index: 1000;
        top: 0;
        left: 0;
        background: url('../assets/backgroundImage.svg') center;
        background-size: cover;
        height: auto;
        min-height: 100vh;
    }
    .record-alert-modal {
        width: 86vw;
        height: 100%;
    }
    .record-alert-content {
        text-align: center;
        width: 100%;
        letter-spacing: 1.71px;
        color: #686b63;
    }
    .back-svg {
        width: 3.9vw;
        height: 6.16vw;
        background: url('../assets/back.svg') center;
        background-size: cover;
        margin: auto 0;
    }
    .borrow-record-box {
        width: 86.1vw;
        height: fit-content;
        background-color: white;
        border-radius: 15px;
        margin-bottom: 2.1px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        /* max-height: 35vw; */
        max-height: 15.83vw;
        /* transition: 0.5s; */
    }
    .borrow-record-extend {
        max-height: 35vw !important;
    }
    .record-clear {
        max-height: 0px !important;
        transition: 0.2s;
    }
    .borrow-record-box:last-child {
        margin-bottom: 5vw;
    }
    .borrow-record {
        position: relative;
        display: flex;
    }
    .record-left {
        width: 100%;
        border-right: solid 1px rgba(104, 107, 99, 0.2);
        margin: 1vw auto;
    }
    .date-circle {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 12.2vw;
        height: 12.2vw;
        border-radius: 50%;
        background-color: #dfc62d;
        margin: 1.66vw 5.5vw 1.66vw 2.77vw;
    }
    .date-circle div {
        width: 3.7vw;
        height: 3.7vw;
        font-size: 3vw;
        color: white;
    }
    .mobile-month {
        line-height: 1vw;
    }
    .mobile-day {
        line-height: 8vw;
        position: relative;
        right: 1vw;
    }
    .mobile-nav div {
        letter-spacing: 4.1px;
        color: #686b63;
        text-align: left;
    }
    .mobile-room {
        font-weight: bold;
        font-size: 3.88vw;
        margin-top: 2.5vw;
        margin-bottom: 1.25vw;
    }
    .mobile-time {
        font-size: 3.33vw;
    }
    .mobile-reason {
        letter-spacing: 2.93px;
        font-size: 2.77vw;
        max-width: 63vw;
        margin: auto;
        text-align: left;
        margin-bottom: 4vw;
        word-break: break-all;
    }
    .mobile-edit-box {
        height: 90%;
        width: 13.75vw;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-size: 2.77vw;
        letter-spacing: 3.47px;
    }
    .mobile-delete {
        background: url('../assets/red_cancel.svg') center;
        background-size: cover;
        width: 3vw;
        height: 3vw;
    }
    .alert-modal {
        width: 90vw;
    }
    .navbar {
        display: flex;
        position: relative;
        margin-top: 10vw;
        margin-bottom: 5vw;
    }
    textarea {
        height: 7.5vw;
        margin-left: 1.3vw;
        width: 55vw;
        font-size: 2.67vw;
        line-height: 5.5vw;
    }
    .button-box {
        position: absolute;
        right: 0;
        margin: auto;
        z-index: 1000;
        width: 22vw;
        margin-top: 0.25vw;
    }
    .drop {
        width: 17.7vw;
        height: 6.6vw;
        object-fit: contain;
        opacity: 0.8;
        border-radius: 5px;
        box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.16);
        background-color: #96c45a;
        color: white;
        text-align: center;
        margin-bottom: 2.7vw;
        font-size: 2.5vw;
        line-height: 6.6vw;
        margin: auto;
        display: flex;
        padding-left: 2.63vw;
        margin-left: 2.63vw;
    }
    .drop div {
        font-size: 2.63vw;
    }
    .drop-selection {
        border-radius: 5px;
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
        background-color: #ffffff;
        padding: 1.38vw 1.94vw 0.03vw 1.38vw;
        width: 100%;
    }
    .drop-selection div {
        width: 17.7vw;
        height: 6.6vw;
        object-fit: contain;
        opacity: 0.8;
        border-radius: 5px;
        box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.16);
        background-color: #96c45a;
        color: white;
        text-align: center;
        margin: auto;
        margin-bottom: 1.35vw;
        font-size: 2.5vw;
        line-height: 6.6vw;
    }
    .drop-svg {
        background: url('../assets/drop.svg') center;
        background-size: cover;
        width: 2.63vw;
        height: 1.63vw;
        margin: auto;
    }
}
</style>
