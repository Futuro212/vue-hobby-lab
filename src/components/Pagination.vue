<template>
    <nav class="pagination" role="navigation" aria-label="pagination">
        <!-- we want to allow the click only when there's a previous page -->
        <a class="pagination-previous" @click="disabledPreviousPage? null : setPage(page-1)" :disabled="disabledPreviousPage">Previous</a>
        <a class="pagination-next" @click="disabledNextPage? null : setPage(page+1)" :disabled="disabledNextPage">Next page</a>
    </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSetStore } from '@/stores/set';
import { storeToRefs } from 'pinia';


const { setPageNumber, fetchSets } = useSetStore();
const { sets, page, pageSize } = storeToRefs(useSetStore())

const setPage = (number: number) => {
    setPageNumber(number);
    fetchSets();
};

const disabledPreviousPage = computed(() => {
    // We need to remove the disabled property with null value
    return page.value === 1 ? true : null;
})

const finalPage = Math.floor(sets.value.count / pageSize.value);
const disabledNextPage = computed(() => {
    // We need to remove the disabled property with null value
    return page.value === finalPage ? true : null;
})

</script>

<style scoped lang="scss">
.pagination {
    justify-content: flex-end;
}
</style>