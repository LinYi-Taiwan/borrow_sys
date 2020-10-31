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
}

const getters = {}

const actions = {
    async Login({ commit }, googleUser) {
        let token = googleUser.getAuthResponse(googleUser.getBasicProfile().getEmail())
        localStorage.tokens = JSON.stringify({
            accessToken: token['access_token'],
            user_email: googleUser.getBasicProfile().getEmail(),
            user_name: googleUser.getBasicProfile().getName(),
        })
        await axios.post('http://localhost:8000/google/', { token: token }).then((res) => console.log(res))
        router.push('/allRooms')
    },
    async getRoomPage({ commit }) {
        await axios
            .get('http://localhost:8000/RoomModule', {
                params: {
                    function: 'get_room_page',
                    access_token: this.state.room.tokens.access_token,
                },
            })
            .then((res) => {
                this.state.roomPage = res.data
            })
    },
    async getRoomData({ commit }, room_name) {
        await axios
            .post('http://localhost:8000/RoomModule/', {
                function: 'get_room_data',
                room_name: room_name,
                access_token: this.state.room.tokens.accessToken,
            })
            .then((res) => {
                this.state.roomData = res.data
                // commit("updateRoomData", res.data);
            })
    },
    async createNewBorrow({ commit }, createInfo) {
        await axios
            .post('http://localhost:8000/RoomModule/', {
                function: 'create_new_borrow',
                data: createInfo,
                access_token: this.state.room.tokens.accessToken,
            })
            .then((res) => console.log(res))
        router.push('/record')

        // .then(res => console.log(res));
    },
    async get_user_borrow_data({ commit }, data) {
        let userInfo = { user_name: data }
        this.state.room.isLoading = true
        await axios
            .post('http://localhost:8000/RoomModule/', {
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
            .post('http://localhost:8000/RoomModule/', {
                function: 'delete_user_borrow_data',
                data,
                access_token: this.state.room.tokens.accessToken,
            })
            .then((res) => console.log(res))
    },
    async logout() {
        await localStorage.removeItem('tokens')
        console.log(localStorage.tokens)
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