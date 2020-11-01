<template>
    <div>
        <div class="modal-box" v-if="delete_alert">
            <div class="alert-modal">
                <img class="cancel" @click="delete_alert = false" src="../assets/cancel.svg" alt="" />
                <div class="alert-content">
                    <div class="alert-title">確認取消借用？</div>
                    <!-- <div class="alert-text">借用教室：{{ this.$route.params.id }}</div>
          <div class="alert-text">
            借用日期：{{ this.$store.state.room.selectTime }}
          </div> -->
                    <div class="alert-text">
                        <!-- 借用時段：{{ start_time.time }}~{{ end_time.time }} -->
                    </div>
                    <div class="check-submit" @click="cancelBorrow()">
                        確定取消！
                    </div>
                </div>
            </div>
        </div>
        <div class="page">
            <div class="record-svg"></div>
            <div class="page-text">借用紀錄</div>
        </div>

        <div class="table-box">
            <div class="borrow-name">借用人：{{ $store.state.room.tokens.user_name }}</div>
            <textarea
                name=""
                id=""
                placeholder="搜尋關鍵字"
                v-model="search_text"
                onkeydown="if(event.keyCode==13)return false;"
            ></textarea>
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
            <table class="table-content">
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
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'Record',
    data() {
        return {
            select_delete_data: [],
            select_field: '',
            search_text: '',
            delete_alert: false,
        }
    },
    async created() {
        await this.get_user_borrow_data(this.$store.state.room.tokens.user_email)
    },
    computed: {
        dataSearch() {
            if (this.search_text === '') return this.$store.state.room.userData.data
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
        edit(edit_data) {
            this.select_delete_data = edit_data
            this.delete_alert = true
        },
        cancelBorrow() {
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
    width: 921.9px;
    height: auto;
    max-height: 200px;
    border: solid 2.5px white;
    border-collapse: separate;
    border-spacing: 0;
}
tr {
    /* transform: translateX(10px); */
}
td,
th {
    width: 100px;
    height: 50px;
    word-wrap: break-word;
    color: #686b63;
    text-align: center;
    line-height: 60px;
    border: solid 2.5px rgb(255, 255, 255, 1);
    white-space: nowrap;
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
    max-height: 330px;
    width: 951.9px;
    overflow: hidden;
}
.table-box-content {
    margin-bottom: 50px;
}
.table-content {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
}
.table-title {
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
}
.table-box:hover {
    overflow-y: auto;
    overflow-x: hidden;
}
.table-box::-webkit-scrollbar {
    /* display: none; */
}
textarea {
    background: url('../assets/search.svg') no-repeat scroll center transparent;
    position: relative;
    margin-right: 100px;
    margin-bottom: 24px;
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
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: calc(90% - 108px);
    z-index: 1000;
}
.alert-modal {
    position: absolute;
    width: 414px;
    /* height: 330px; */
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
</style>
