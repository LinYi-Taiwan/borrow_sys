<template>
    <div>
        <input type="text" v-model="message" />
    </div>
</template>

<script>
export default {
    name: 'testChat',
    data() {
        return {
            message: '',
            testsocket: '',
        }
    },
    methods: {
        send() {
            this.testsocket.send(this.message)
            this.testsocket.onmessage = (res) => {
                console.log('WS', res.data)
            }
        },
        close_socket() {
            this.testsocket.close()
        },
    },
    mounted() {
        this.testsocket = new WebSocket('ws://127.0.0.1:8000/ws/')
    },
}
</script>
