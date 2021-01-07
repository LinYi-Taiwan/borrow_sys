<template>
    <div class="logo-home">
        <img class="white-logo" src="../assets/whitelogo.svg" alt="img" />
        <div class="title-box">
            <div class="title-up">諮商與臨床心理學系</div>
            <div class="title-down">教室借用系統</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'test',
}
</script>

<style scoped>
.logo-home {
    display: flex;
    /* position: absolute; */
    height: 57px;
    margin: 32px 0 30.9px 156px;
}
.title-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.title-up {
    font-size: 14px;
    letter-spacing: 0.49px;
    text-align: left;
    color: #ffffff;
}
.title-down {
    font-size: 20px;
    letter-spacing: 2.34px;
    text-align: left;
    color: #ffffff;
}
.white-logo {
    width: 33px;
    height: 40px;
    margin-right: 10px;
    background: url('../assets/whitelogo.svg') center;
    background-size: cover;
    margin-top: 10px;
}
@media only screen and (max-width: 1024px) {
    .logo-home {
        margin: auto;
        width: fit-content;
        height: fit-content;
        padding-top: 5vw;
    }
    .title-up {
        letter-spacing: 0.45vw;
        font-size: 2.77vw;
        margin-bottom: 0;
    }
    .title-down {
        letter-spacing: 0.45vw;
        font-size: 3.88vw;
    }
    .white-logo {
        width: 6.36vw;
        height: 7.5vw;
        margin: 2vw 1vw 0 3vw;
    }
}
</style>
