<template>
    <div class="room">
        <div class="content">
            <Calendar />

            <div class="right">
                <div class="up">
                    <div class="select-time">
                        {{ this.$store.state.room.selectTime }}
                    </div>
                    <div class="select">
                        <div class="select-label">開始時間</div>
                        <select v-model="start_time" name="start_select" id="start_select">
                            <option v-for="time in start_time_options" :key="time.time + 'start'" :value="time">{{
                                time.time
                            }}</option>
                        </select>
                    </div>
                    <div class="select">
                        <div class="select-label">結束時間</div>
                        <select aria-placeholder="123test" v-model="end_time" name="end_select" id="end_select">
                            <option v-for="time in end_time_options" :key="time.time + 'end'" :value="time">{{
                                time.time
                            }}</option>
                        </select>
                    </div>
                </div>
                <div class="mid">
                    <div class="description-field">
                        <div class="gray-block"></div>
                        <div class="description">此空間已借用/超出時間</div>
                    </div>
                    <div class="square-box" ref="square">
                        <div
                            class="time-square"
                            v-for="i in time_interval"
                            :key="i.id + 'time_interval'"
                            :class="{
                                disable: i.is_borrowed === true,
                                is_select: i.is_select,
                            }"
                        >
                            <div class="clock" v-if="i.id % 2 === 0">{{ i.id / 2 }}</div>
                        </div>
                    </div>
                </div>
                <div class="textarea-box">
                    <div class="borrow-reason">
                        借用事由
                    </div>
                    <textarea type="text" v-model="borrow_reason" maxlength="30" placeholder="字數上限為30字..." />
                </div>
                <div class="submit-box">
                    <div class="submit" @click="submit()">
                        申請借用
                    </div>
                </div>
                <div></div>
            </div>
        </div>
        <div class="modal-box" v-if="show_alert">
            <div class="alert-modal">
                <img class="cancel" @click="show_alert = false" src="../../assets/cancel.svg" alt="" />
                <div class="alert-content">
                    <div class="alert-title">以下是您即將借用的教室資訊：</div>
                    <div class="alert-text">借用教室：{{ this.$route.params.id }}</div>
                    <div class="alert-text">借用日期：{{ this.$store.state.room.selectTime }}</div>
                    <div class="alert-text">借用時段：{{ start_time.time }}~{{ end_time.time }}</div>
                    <div
                        class="check-submit"
                        @click="
                            createNewBorrow({
                                start_time: start_time,
                                end_time: end_time,
                                borrow_room: $route.params.id,
                                borrower: $store.state.room.tokens.user_email,
                                borrow_reason: borrow_reason,
                                date: $store.state.room.selectTime,
                            })
                            show_alert = false
                        "
                    >
                        確定借用！
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import Calendar from '@/components/calendar'
import axios from 'axios'

export default {
    name: 'room',
    components: { Calendar },
    data() {
        return {
            start_time: {},
            end_time: {},
            room_data: [],
            borrow_reason: '',
            time_interval: [],
            show_alert: false,
            target_data: {},
        }
    },
    async created() {
        this.$store.state.room.isLoading = true
        await this.getRoomData(this.$route.params.id)
        this.room_data = this.$store.state.roomData
        this.createTimeInterval()
        this.$store.state.room.isLoading = false
    },
    computed: {
        getDataByDay() {
            this.createTimeInterval()
            return this.room_data.filter((data) => data.start_time.split('T')[0] === this.$store.state.room.selectTime)
        },

        start_time_options() {
            return this.time_interval.filter((data) => data.is_borrowed !== true)
        },
        end_time_options() {
            if (this.start_time.id === undefined) return

            let time_list = []
            // console.log(this.time_interval);
            for (let obj of this.time_interval.slice(this.start_time.id + 1)) {
                time_list.push(obj)
                if (obj.id === 47 && obj.is_borrowed === false) {
                    time_list.push({ id: 48, time: '23:59' })
                }
                if (obj.is_borrowed === true) return time_list
            }
            return time_list
        },
        watch_start_end_time() {
            return this.start_time, this.end_time
        },
        watch_select_time() {
            return this.$store.state.room.selectTime, this.room_data
        },
    },
    watch: {
        watch_select_time: function() {
            this.createTimeInterval()

            let numOfInterval = ''
            let start_time_field = ''
            let time_obj = ''
            let now = new Date().getHours()
            this.getDataByDay.forEach((element) => {
                //get the intervals
                numOfInterval =
                    (new Date(element.end_time).getTime() - new Date(element.start_time).getTime()) / 1000 / 60 / 30
                //get the start obj
                start_time_field = `${new Date(element.start_time).getHours()}:${new Date(element.start_time)
                    .getMinutes()
                    .toString()
                    .padEnd(2, 0)}`
                time_obj = this.time_interval.filter((data) => data.time === start_time_field)
                for (var start = time_obj[0].id; start < time_obj[0].id + numOfInterval; start++) {
                    this.time_interval[start].is_borrowed = true
                }
            })
        },
        watch_start_end_time: function() {
            if (this.end_time.id === undefined) return
            //clean the selects when change the date or target time
            this.time_interval.forEach((element) => (element.is_select = false))

            //get the target interval
            let slice_obj = this.time_interval.slice(this.start_time.id, this.end_time.id)
            //check the obj of is_borrowed === true not in this interval
            for (let obj of slice_obj) {
                if (obj.is_borrowed === true) {
                    this.time_interval.forEach((element) => (element.is_select = false))
                    this.end_time = {}
                    return
                }
            }
            this.time_interval
                .slice(this.start_time.id, this.end_time.id)
                .forEach((element) => (element.is_select = true))
        },
    },
    methods: {
        ...mapActions(['userLogin', 'getRoomDate', 'getRoomData', 'createNewBorrow']),

        createTimeInterval() {
            let time_list = []
            for (var hour = 0; hour < 24; hour++) {
                for (var min = 0; min < 2; min++) {
                    min === 0
                        ? time_list.push({
                              id: time_list.length,
                              time: `${hour}:${min * 30}0`,
                              is_borrowed: this.filterIsOverdue(hour, min),
                              is_select: false,
                          })
                        : time_list.push({
                              id: time_list.length,
                              time: `${hour}:${min * 30}`,
                              is_borrowed: this.filterIsOverdue(hour, min),
                              is_select: false,
                          })
                }
            }
            this.time_interval = time_list
        },
        filterIsOverdue(hour, min) {
            let now = new Date()
            let today = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-')

            if (this.$store.state.room.selectTime === today && hour <= now.getHours()) {
                if (hour === now.getHours() && min * 30 >= now.getMinutes()) {
                    return false
                } else {
                    return true
                }
            } else {
                return false
            }
        },
        submit() {
            if (this.start_time.id === undefined) {
                return alert('尚未選擇起始時間')
            }
            if (this.end_time.id === undefined) {
                return alert('尚未選擇結束時間')
            }
            if (this.borrow_reason === '') {
                return alert('請輸入借用原因')
            }
            this.show_alert = !this.show_alert
        },
    },
}
</script>

<style scoped>
.room {
    display: flex;
    flex-direction: column;
}
.page {
    display: flex;
    width: 300px;
    margin: 0.95vw 0 4.6vw 13.54vw;
}
.key-svg {
    filter: drop-shadow(2px 4px 10px rgba(0, 0, 0, 0.3));
    background: url('../../assets/key.svg');
    background-size: cover;
    width: 30.7px;
    height: 27.3px;
    margin: auto;
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
.content {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 70%;
    margin-top: 5%;
}
.up {
    display: flex;
    margin: 60px 0 58px;
}
.mid {
    margin-bottom: 35.9px;
}
.time-square {
    width: 11.8px;
    height: 15px;
    border: solid 1.5px white;
    border-top: solid 2px white;
    border-bottom: solid 2px white;
    opacity: 1;
    transition: 0.5s;
    box-sizing: border-box;
}
.time-square:first-child {
    width: 12px;
    border-top-left-radius: 50%;
    border-bottom-left-radius: 50%;
    border-left: solid 3px white;
}
.time-square:last-child {
    width: 11px;
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
    border-right: solid 3px white;
}
.square-box {
    display: flex;
}
.disable {
    background-color: rgba(144, 153, 134, 0.6);
}
.scheduled {
    background-color: lightgreen;
}
.right {
    display: flex;
    flex-direction: column;
    margin-left: 61px;
}
.clock {
    position: relative;
    top: 18px;
    left: -5px;
    font-size: 11px;
    color: #686b63;
    letter-spacing: -0.39px;
}
.select-time {
    width: 134px;
    height: 46.3px;
    background-color: #b3cd71;
    font-size: 13px;
    text-align: center;
    font-weight: bold;
    line-height: 46.3px;
    border-radius: 20px;
    color: white;
    margin-right: 154px;
}
.start-time-box {
    width: 59px;
    height: 11px;
    font-size: 10px;
    color: #686b63;
}
.select {
    margin-right: 41.8px;
}
textarea {
    width: 570px;
    height: 105px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.3);
    padding-top: 27px;
    padding-left: 17px;
    resize: none;
    font-size: 12px;
    letter-spacing: 1.31px;
    box-sizing: border-box;
    border: solid 3px white;
}
.textarea-box {
}
textarea:focus {
    outline-width: 0;
}
.borrow-reason {
    position: relative;
    top: 27px;
    width: 88px;
    border-radius: 14px;
    background-color: #ffffff;
    height: 27px;
    line-height: 27px;
    font-size: 12px;
    letter-spacing: 1.31px;
    text-align: center;
    color: #686b63;
}
.submit-box {
    width: 569px;
}
.submit {
    width: 162px;
    height: 34px;
    border: solid 3px white;
    border-radius: 51px;
    background-color: #b3cd71;
    position: relative;
    float: right;
    margin-top: 32px;
    font-size: 13px;
    letter-spacing: 2.57px;
    text-align: center;
    line-height: 28px;
    color: #ffffff;
    cursor: pointer;
    box-sizing: border-box;
}
.submit:hover {
    background-color: #7e9a58;
}
.is_select {
    /* background-color: #7e9a58; */
    background-color: #b3cd71;
    transition: 0.5s;
}
select {
    width: 120.2px;
    height: 29.6px;
    border: solid 0px white;
    color: white;
    border-radius: 20px;
    background-color: #7e9a58;
    font-weight: bold;
    font-size: 12px;
    line-height: 23.6px;
    letter-spacing: 1.31px;
    text-align: center;
    padding-left: 34px;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background: url('../../assets/select.svg') no-repeat scroll center transparent;
}
.select-label {
    margin-left: 10px;
    font-size: 10px;
    letter-spacing: 6.43px;
    text-align: left;
    color: #686b63;
}

textarea,
select,
input,
button {
    outline: none;
}
.modal-box {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100vw;
    z-index: 1000;
    padding: auto;
    transition: 1s;
}
.alert-modal {
    position: absolute;
    width: 414px;
    height: 330px;
    opacity: 0.85;
    border-radius: 22px;
    background-color: #ffffff;
    transition: 1s;
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
    background-color: #b3cd71;
    font-size: 18px;
    letter-spacing: 1.93px;
    text-align: center;
    margin: 0 auto;
    color: white;
    line-height: 36px;
    margin-top: 37px;
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
.description-field {
    display: flex;
    margin-bottom: 12.1px;
}
.gray-block {
    width: 13px;
    height: 13px;
    background-color: rgba(144, 153, 134, 0.6);
    border: solid 2px white;
    border-radius: 3px;
}
.description {
    width: auto;
    font-size: 10px;
    color: #686b63;
    margin-left: 6px;
}
@media only screen and (max-width: 1024px) {
    .content {
        display: block;
    }
    .select-time {
        width: 26.6vw;
        height: 7.5vw;
        line-height: 7.5vw;
        box-sizing: border-box;
        border-radius: 30.8vw;
        margin: auto;
        background-color: #b3cd71;
        margin-right: 2vw;
        font-size: 2.77vw;
    }
    .right {
        margin: auto;
    }
    .up {
        margin: 3vw auto;
        padding-left: 5vw;
    }
    .square-box {
        justify-content: center;
    }
    .time-square {
        width: 1.8vw;
        height: 3.7vw;
        border: solid 0.1vw white;
        border-top: solid 0.2vw white;
        border-bottom: solid 0.2vw white;
    }
    .time-square:first-child {
        width: 1.8vw;
        border-left: solid 0.2vw white;
    }
    .time-square:last-child {
        width: 1.8vw;
        border-right: solid 0.2vw white;
    }
    .clock {
        font-size: 2.1vw;
        top: 4vw;
    }
    .mid {
        margin: 0;
    }
    select {
        width: 24vw;
        height: 5.86vw;
        padding-left: 4.77vw;
        background-size: cover;
    }
    .select {
        margin-right: 3.5vw;
    }
    .textarea-box {
        width: 88vw;
        margin: 5vw auto;
    }
    textarea {
        width: 88vw;
        height: 12.2vw;
        padding-top: 1vw;
        padding-left: 14vw;
        font-size: 2.2vw;
    }
    .submit-box {
        width: auto;
        margin-bottom: 15vw;
    }
    .submit {
        float: none;
        margin: auto;
    }
    .borrow-reason {
        width: 12.2vw;
        height: 5.27vw;
        font-size: 2.2vw;
        top: 6vw;
        line-height: 5.27vw;
    }
    .description-field {
        width: fit-content;
        margin: 2vw auto;
        font-size: 2.2vw;
    }
    .alert-modal {
        width: 90vw;
    }
}
</style>
