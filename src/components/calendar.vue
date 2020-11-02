<template>
    <div>
        <div class="page-title">{{ this.$route.params.id }}</div>
        <div class="box">
            <div class="calendar">
                <div class="calendar-nav">
                    <div class="change-page" v-if="!preMonthDisabled"></div>
                    <img
                        class="change-page"
                        src="../assets/left.svg"
                        @click="preMonth()"
                        v-if="preMonthDisabled"
                        alt=""
                    />
                    <div class="nav-button">{{ currentDate.month }}月,{{ currentDate.year }}</div>
                    <img class="change-page" src="../assets/right.svg" @click="nextMonth()" alt="" />
                </div>
                <div class="line"></div>
                <div class="weekday-box">
                    <div class="weekday weekday-margin" v-for="weekday in weekdays" :key="weekday">
                        {{ weekday }}
                    </div>
                </div>

                <div class="day-box">
                    <div class="day hidden" v-for="pre in monthFirstDay - 1" :key="'pre' + pre"></div>
                    <div
                        class="day"
                        :class="{ disable: dayDisable(day) }"
                        v-for="day in currentMonthDay"
                        :key="'currentMonthDay' + String(day)"
                        :ref="String(currentDate.year) + String(currentDate.month) + String(day)"
                        @click="clickOn(day)"
                    >
                        {{ day }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'calendar',
    data() {
        return {
            weekdays: ['一', '二', '三', '四', '五', '六', '日'],
            currentDate: {
                date: 0,
                month: 0,
                year: 0,
            },
            test: 10,
            targetDay: '',
        }
    },
    created() {
        let today = new Date()
        this.currentDate.date = today.getDate()
        this.currentDate.month = today.getMonth() + 1
        this.currentDate.year = today.getFullYear()
        this.targetDay = String(this.currentDate.year) + String(this.currentDate.month) + String(this.currentDate.date)
        this.makeCurrentDate()
    },
    mounted() {
        this.$refs[this.targetDay][0].classList.add('click-on')
    },
    computed: {
        currentMonthDay() {
            return new Date(this.currentDate.year, this.currentDate.month, 0).getDate()
        },
        preMonthDay() {
            let year = this.currentDate.month === 0 ? this.currentDate.year - 1 : this.currentDate.year
            let month = this.currentDate.month === 0 ? 12 : this.currentDate.month
            return new Date(year, month, 0).getDate()
        },
        monthFirstDay() {
            let firstDay = new Date(this.currentDate.year, this.currentDate.month - 1, 1).getDay()
            if (firstDay === 0) return 7
            return firstDay
        },
        preMonthDisabled() {
            let now = new Date()
            let now_year = now.getFullYear()
            let now_month = now.getMonth() + 1
            let now_day = now.getDate()
            return this.currentDate.year <= now_year && this.currentDate.month === now_month ? false : true
        },
    },
    methods: {
        makeCurrentDate() {
            this.$store.state.room.selectTime = [
                String(this.currentDate.year),
                String(this.currentDate.month),
                String(this.currentDate.date),
            ].join('-')
        },
        clickOn(day) {
            let now = new Date()

            if (
                day < now.getDate() &&
                now.getFullYear() === this.currentDate.year &&
                now.getMonth() + 1 === this.currentDate.month
            ) {
                return
            }
            this.removeClass()
            this.currentDate.date = day
            console.log(this.currentDate)
            this.targetDay =
                String(this.currentDate.year) + String(this.currentDate.month) + String(this.currentDate.date)
            this.$refs[this.targetDay][0].classList.add('click-on')
            this.makeCurrentDate()
        },
        preMonth() {
            this.removeClass()
            this.currentDate.month = this.currentDate.month - 1
            this.targetDay = ''
            this.currentDate.month === 0 ? this.adjustDate('pre') : this.currentDate.year
        },
        nextMonth() {
            this.removeClass()
            this.currentDate.month = this.currentDate.month + 1
            this.targetDay = ''
            this.currentDate.month === 13 ? this.adjustDate('next') : this.currentDate.year
        },
        removeClass() {
            this.targetDay === '' ? '' : this.$refs[this.targetDay][0].classList.remove('click-on')
        },
        adjustDate(func) {
            if (func === 'pre') {
                this.currentDate.year = this.currentDate.year - 1
                this.currentDate.month = 12
            } else if (func === 'next') {
                this.currentDate.year = this.currentDate.year + 1
                this.currentDate.month = 1
            }
        },
        dayDisable(day) {
            let now = new Date()
            let now_year = now.getFullYear()
            let now_month = now.getMonth() + 1
            let now_day = now.getDate()
            return now_day > day && this.currentDate.month === now_month && this.currentDate.year === now_year
                ? true
                : false
        },
    },
}
</script>

<style scoped>
.page-title {
    width: 314px;
    height: 27px;
    font-family: 'Noto Sans TC', sans-serif;
    font-size: 24px;
    line-height: 1.38;
    letter-spacing: 2.57px;
    text-align: center;
    margin-bottom: 22px;
    color: #686b63;
}
.box {
    display: flex;
    justify-content: center;
    width: 100%;
}
.click-on {
    background-color: #b3cd71;
    border-radius: 50%;
    background-clip: content-box;
    -webkit-animation: click-on 0.25s ease-in-out both;
    moz-animation: click-on 0.25s ease-in-out both;
    -o-animation: click-on 0.25s ease-in-out both;
    animation: click-on 0.25s ease-in-out both;
}
@-webkit-keyframes click-on {
    0% {
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
        -o-transform: scale(1);
        transform: scale(1);
        opacity: 0.8;
    }

    50% {
        -webkit-transform: scale(1.1);
        -moz-transform: scale(1.1);
        -o-transform: scale(1.1);
        transform: scale(1.1);
    }

    100% {
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
        -o-transform: scale(1);
        transform: scale(1);
        opacity: 1;
    }
}
@keyframes click-on {
    0% {
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
        -o-transform: scale(1);
        transform: scale(1);
        opacity: 0.8;
    }

    50% {
        -webkit-transform: scale(1.1);
        -moz-transform: scale(1.1);
        -o-transform: scale(1.1);
        transform: scale(1.1);
    }

    100% {
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
        -o-transform: scale(1);
        transform: scale(1);
        opacity: 1;
    }
}

.calendar {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    width: 314px;
    height: 100%;
    opacity: 0.8;
    border-radius: 50px;
    border: solid 4px white;
    padding: 14.7px 0 27px 12px;
}
.calendar-nav {
    width: 56%;
    height: 10px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    line-height: 10px;
    position: relative;
    left: -7px;
}
.day {
    width: 40px;
    height: 40px;
    font-size: 18px;
    text-align: center;
    color: #686b63;
    line-height: 40px;
    margin-left: -3px;
    border: solid 2px rgba(255, 255, 255, 0);
}
.day:hover:not(.hidden):not(.click-on):not(.disable) {
    opacity: 0.58;
    border-radius: 50%;
    background-color: white;
    cursor: pointer;
    border: solid 2px rgba(255, 255, 255, 0);
}

.day-box {
    width: 100%;
    height: 70%;
    display: flex;
    flex-wrap: wrap;
    margin-left: 10px;
}
.line {
    width: 247.4px;
    border-top: solid 4px #fffefe;
    margin: 10.7px 33.7px 10.7px 27.7px;
}
.weekday-box {
    width: 270px;
    height: 20px;
    margin-left: 18px;
    margin-bottom: 14.5px;
}
.weekday {
    width: 21px;
    height: 19px;
    -webkit-text-stroke: 0.5px #ffffff;
    font-size: 16.4px;
    text-align: center;
    display: inline;
    color: #fcfcfc;
}
.weekday-margin:not(:last-child) {
    margin-right: 21.4px;
}
.change-page {
    cursor: pointer;
    width: 15px;
    height: 15px;
}

.nav-button {
    width: 104px;
    height: 14px;
    -webkit-text-stroke: 0.5px #686b63;

    font-size: 13px;
    letter-spacing: 0.49px;
    text-align: center;
    color: #686b63;
}
.disable {
    color: #b4b48f;
    cursor: not-allowed;
}
</style>
