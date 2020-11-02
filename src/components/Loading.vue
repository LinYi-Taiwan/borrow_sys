<template>
    <div class="loading-box">
        <div class="loading-edge">
            <div class="loading-logo"></div>
        </div>

        <div class="loading-text">LOADING</div>
    </div>
</template>

<script>
export default {
    name: 'loading',
}
</script>

<style scoped>
.loading-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(90% - 108px);
    z-index: 1000;
}

@-webkit-keyframes loading /* Safari and Chrome */ {
    from {
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
@keyframes loading {
    from {
        -ms-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    to {
        -ms-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

.loading-edge {
    width: 104px;
    height: 98px;
    background: url('../assets/loading_edge.svg');
    background-size: cover;
    padding: 27px;
    margin-bottom: 19.3px;
    box-sizing: border-box;
    /* position: absolute; */
    -webkit-animation: loading 2s linear infinite;
    -moz-animation: loading 2s linear infinite;
    -ms-animation: loading 2s linear infinite;
    -o-animation: loading 2s linear infinite;
    animation: loading 2s linear infinite;
}
.loading-logo {
    width: 40.3px;
    height: 47.5px;
    background-size: cover;
    box-sizing: border-box;
    background: url('../assets/loading_logo.svg');
    -webkit-animation: loading 2s reverse linear infinite;
    -moz-animation: loading 2s reverse linear infinite;
    -ms-animation: loading 2s reverse linear infinite;
    -o-animation: loading 2s reverse linear infinite;
    animation: loading 2s reverse linear infinite;
}
.loading-text {
    box-sizing: border-box;
    width: 98px;
    height: 20px;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 6.16px;
    text-align: center;
    color: #676a61;
}
</style>
