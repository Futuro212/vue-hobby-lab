<template>
    <div class="background-container">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
.background-container {
    position: relative; 
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.background-container::before {
    content: "";
    background-image: url('https://us.123rf.com/450wm/route55/route551507/route55150700024/43066457-seamless-pattern-of-plastic-parts-vector-illustration.jpg?ver=6');
    background-size: cover;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    opacity: 0.35;
}

</style>