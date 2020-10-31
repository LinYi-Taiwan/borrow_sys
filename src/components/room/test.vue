<template>
  <div class="content">
    <Calendar />
    <div v-for="(i, index) in test" :key="index">
      {{ i.room }}
      {{ i.borrower }}
      {{ i.start_time }}
    </div>
    <div>
      <p>
        Date: <b>{{ Date_value }}</b>
      </p>
      <select
        v-model="start_time"
        @change="select_start_time(start_time)"
        name="start_time"
        id="start_time"
      >
        <option v-for="t in time_list" :key="t" :value="t">
          {{ t }}
        </option>
      </select>

      <select
        v-model="end_time"
        @change="select_end_time(end_time)"
        name="end_time"
        id="end_time"
      >
        <option v-for="i in end_time_option" :key="i" :value="i">
          {{ i }}
        </option>
      </select>
      <div>
        start_time
        {{ start_time }}
      </div>
      <div>
        end_time
        {{ end_time }}
      </div>
      <div class="square_box" ref="square">
        <div
          class="time_square"
          v-for="i in 2"
          :key="i + Date_value"
          :class="{ disable: i.is_borrowed === true }"
        >
          <div class="clock" v-if="i % 2 === 0">{{ i / 2 - 1 }}</div>
        </div>
      </div>
      {{ reserver }}
    </div>
    <div>
      {{ this.$route.params.id }}
    </div>
  </div>
</template>

<script>
import { getAPI } from "@/axios-api";
import { mapState, mapActions, mapGetters } from "vuex";
import Calendar from "@/components/calendar";
import axios from "axios";

export default {
  name: "room",
  components: { Calendar },
  data() {
    return {
      Date_value: "",
      context: null,
      start_time: "",
      end_time: "",
      room_data: [],
      all_data: {
        "2020/10/08": [
          { id: 0, times: "00:00~00:30", is_borrowed: false },
          { id: 1, times: "00:30~01:00", is_borrowed: false },
          { id: 2, times: "01:00~01:30", is_borrowed: false },
          { id: 3, times: "01:30~02:00", is_borrowed: false },
          { id: 4, times: "02:00~02:30", is_borrowed: false },
          { id: 5, times: "02:30~03:00", is_borrowed: false },
          { id: 6, times: "03:00~03:30", is_borrowed: false },
          { id: 7, times: "03:30~04:00", is_borrowed: false }
        ]
      },
      time_list: [],
      reserver_place: [],
      test: []
    };
  },
  created() {
    this.getRoomData(this.$route.params.id);
    let day = new Date();
    day = [
      day.getFullYear(),
      (day.getMonth() + 1).toString().padStart(2, 0),
      day
        .getDate()
        .toString()
        .padStart(2, 0)
    ].join("/");
    this.room_data = this.all_data[day];
    this.Date_value = day;

    this.test = this.$store.state.room.roomData;
  },
  computed: {
    ...mapState(["tokens"]),
    // getDataByDay() {
    //   return this.test.filter(data =>
    //     data.start_time.includes(this.Date_value)
    //   );
    // },
    reserver() {
      if (this.start_time !== "" && this.end_time !== "") {
        if (this.reserver_place !== []) {
          if (this.end_time_option.includes(this.end_time) === false) {
            this.end_time = "";
          }
          this.updateClass("remove", "square", "scheduled");
        }
        this.make_reserver_place;
        this.updateClass("add", "square", "scheduled");
      }
    },
    make_reserver_place() {
      if (this.end_time === "") return;
      let result = this.room_data.filter(
        data =>
          (data.times.split("~")[0] === this.start_time) |
          (data.times.split("~")[1] === this.end_time)
      );

      if (result.length === 1) {
        this.reserver_place = result;
      } else {
        this.reserver_place = this.room_data.filter(
          data => result[0].id <= data.id && data.id <= result[1].id
        );
      }
    },
    start_time_option() {
      let time_list_box = new Set();
      let filter_data = this.room_data.filter(
        data => data.is_borrowed === false
      );
      filter_data.forEach(data => time_list_box.add(data.times.split("~")[0]));
      this.time_list = Array.from(time_list_box);
    },
    end_time_option() {
      console.log(this.room_data);
      let time_obj = this.room_data.find(
        data => data.times.split("~")[0] === this.start_time
      );
      if (this.start_time === "") return;
      let options = [];
      for (var i = time_obj.id; i <= this.room_data.length; i++) {
        if (this.room_data[i + 1] === undefined) {
          options.push(this.room_data[i].times.split("~")[1]);
          return options;
        }
        options.push(this.room_data[i].times.split("~")[1]);
        if (this.room_data[i + 1].is_borrowed === true) {
          return options;
        }
      }
    },
    day_data_change() {
      let day = this.Date_value.split("-").join("/");
      this.room_data = this.all_data[day];
      this.reserver_place = [];
      this.start_time = "";
      this.end_time = "";
      this.start_time_option;
    }
  },
  updated() {
    this.reserver;
  },
  methods: {
    ...mapActions(["userLogin", "getRoomDate", "getRoomData"]),
    select_start_time(k) {
      this.start_time = k;
    },
    select_end_time(k) {
      this.end_time = k;
    },
    updateClass(action, refName, className) {
      if (action === "add") {
        this.reserver_place.forEach(data =>
          this.$refs[refName].children[data.id].classList.add(className)
        );
      }
      if (action === "remove") {
        this.reserver_place.forEach(data =>
          this.$refs[refName].children[data.id].classList.remove(className)
        );
        this.reserver_place = [];
      }
    }
  }
};
</script>

<style scoped>
.calendar {
  margin: 5vw;
}
.content {
  display: flex;
  width: 100%;
  height: 70%;
  border-radius: 1vw;
}
.time_square {
  width: 20px;
  height: 20px;
  background-color: white;
  border: solid 1px gray;
  opacity: 0.7;
}
.square_box {
  display: flex;
}
.disable {
  background-color: lightgray;
}
.scheduled {
  background-color: lightgreen;
}
.clock {
  position: relative;
  top: 20px;
  left: -25px;
}
</style>
