<template>
    <div class="card">
        <div class="card-content">
            <SetDetail/>
        </div>
    </div>
</template>

<script setup lang="ts">
import SetDetail from "@/components/SetDetail.vue";
</script>

<style scoped lang="scss">
.card {
    align-self: baseline;
    margin-top: 3em;
    width: 90%;
}
</style>