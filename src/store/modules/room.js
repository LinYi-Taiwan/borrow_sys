import axios from 'axios'
import router from '@/router/router'

const state = {
    tokens: {
        accessToken: null,
        refreshToken: null,
        user_email: null,
        user_name: null,
    },
    roomPage: [],
    roomData: [],
    userData: [],
    selectTime: null,
    isLoading: false,
    homeService: 'initial',
    device: '',
    showQuestion: false,
}
const api_url = 'https://borrowroombackend.herokuapp.com'
// const api_url = 'http://localhost:8000'

const getters = {}

const actions = {
    async Login({ commit }, googleUser) {
        this.state.room.isLoading = true
        let token = googleUser.getAuthResponse(googleUser.getBasicProfile().getEmail())
        localStorage.tokens = JSON.stringify({
            accessToken: token['access_token'],
            user_email: googleUser.getBasicProfile().getEmail(),
            user_name: googleUser.getBasicProfile().getName(),
        })
        await axios.post(`${api_url}/google/`, { token: token }).then((res) => console.log(res))

        router.push('/home')
    },
    async get_room_page({ commit }) {
        await axios
            .get(`${api_url}/RoomModule/`, {
                params: {
                    function: 'get_room_page',
                    access_token: this.state.room.tokens.access_token,
                },
            })
            .then((res) => {
                this.state.room.roomPage = res.data
            })
    },
    async get_room_data({ commit }, room_name) {
        await axios
            .post(`${api_url}/RoomModule/`, {
                function: 'get_room_data',
                room_name: room_name,
                access_token: this.state.room.tokens.accessToken,
            })
            .then((res) => {
                if (res['data']['error']) {
                    console.log(res['data'])
                    router.push('/*')
                } else {
                    this.state.roomData = res.data
                }
            })
    },
    async create_new_borrow({ commit }, createInfo) {
        this.state.room.isLoading = true
        await axios
            .post(`${api_url}/RoomModule/`, {
                function: 'create_new_borrow',
                data: createInfo,
                access_token: this.state.room.tokens.accessToken,
            })
            .then((res) => {
                if (!res['data']['error']) {
                    alert('借用成功！請至主頁查看借用紀錄。')
                }
            })
            .catch((error) => {
                alert('發生錯誤，請重新借用')
            })
        router.push('/home')
    },
    async get_user_borrow_data({ commit }, data) {
        let userInfo = { user_name: data }
        this.state.room.isLoading = true
        await axios
            .post(`${api_url}/RoomModule/`, {
                function: 'get_user_borrow_data',
                userInfo,
                access_token: this.state.room.tokens.accessToken,
            })
            .then((res) => {
                this.state.room.userData = res
                this.state.room.isLoading = false
            })
    },
    async delete_user_borrow_data({ commit }, data) {
        await axios
            .post(`${api_url}/RoomModule/`, {
                function: 'delete_user_borrow_data',
                data,
                access_token: this.state.room.tokens.accessToken,
            })
            .then((res) => console.log(res))
    },
    async send_message_to_admin({ commit }, data) {
        await axios
            .post(`${api_url}/RoomModule/`, {
                function: 'send_line_notify',
                data,
                access_token: this.state.room.tokens.accessToken,
            })
            .then((res) => console.log(res))
    },
    async logout() {
        await localStorage.removeItem('tokens')
        this.state.room.isLoading = false
        router.push('/login')
    },
}

const mutations = {
    updateStorage: (state, { access, refresh, email }) => {
        state.tokens.accessToken = access
        state.tokens.refreshToken = refresh
        state.tokens.user_email = email
    },
    updateRoomData: (state, res) => {
        state.roomData = res
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
}
