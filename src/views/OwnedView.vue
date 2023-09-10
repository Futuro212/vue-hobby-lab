<template>
    <div class="card">
        <div class="card-content">
            <SetTable :sets="user.owned"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import SetTable from "@/components/SetTable.vue";

import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
const { user } = storeToRefs(useAuthStore());
</script>

<style scoped lang="scss">
.card {
    align-self: baseline;
    margin-top: 3em;
    width: 90%;
}
</style>