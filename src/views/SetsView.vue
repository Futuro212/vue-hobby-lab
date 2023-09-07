<template>
    <div class="card">
        <div class="card-content">
            <SetPageSize></SetPageSize>
            <SetTable></SetTable>
        </div>
    </div>
</template>

<script setup lang="ts">
import SetPageSize from "@/components/SetPageSize.vue";
import SetTable from "@/components/SetTable.vue";
</script>

<style scoped lang="scss">
.card {
    align-self: baseline;
    margin-top: 3em;
    width: 90%;
}
</style>