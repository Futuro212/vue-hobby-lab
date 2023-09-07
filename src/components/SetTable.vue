<template>
    <p v-if="loading">Loading Sets...</p>
    <p v-if="error">{{ error.message }}</p>

    <table class="table set-table">
        <thead>
            <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Year</th>
                <th>#Parts</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="set in sets.results" :key="set.set_num">
                <td><img class="set-image" :src="set.set_img_url"></td>
                <td>{{set.name}}</td>
                <td>{{set.year}}</td>
                <td>{{set.num_parts}}</td>
                <td><RouterLink class="button is-light" :to="`sets/${set.set_num}`">More Detail</RouterLink></td>
            </tr>
        </tbody>
    </table>

</template>

<script setup lang="ts">
import { useSetStore } from '@/stores/set';
import { storeToRefs } from 'pinia';

const { sets, loading, error } = storeToRefs(useSetStore())
const { fetchSets } = useSetStore();

fetchSets();
</script>

<style scoped lang="scss">
.set-table {
    width: 100%;
}
.set-image {
    width: 200px;
}
</style>