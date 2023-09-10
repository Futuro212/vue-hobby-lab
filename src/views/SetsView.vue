<template>
    <div class="card">
        <div class="card-content">
            <SetPageSize/>
            <SetTable :loading="loading" :error="error" :sets="sets"/>
            <Pagination/>
        </div>
    </div>
</template>

<script setup lang="ts">
import Pagination from "@/components/Pagination.vue";
import SetPageSize from "@/components/SetPageSize.vue";
import SetTable from "@/components/SetTable.vue";

import { storeToRefs } from 'pinia';
import { useSetStore } from '@/stores/set';

const { sets, loading, error } = storeToRefs(useSetStore())
const { fetchSets } = useSetStore();

fetchSets();
</script>

<style scoped lang="scss">
.card {
    align-self: baseline;
    margin-top: 3em;
    width: 90%;
}
</style>