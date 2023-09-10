<template>
    <p v-if="loading">Loading Set...</p>
    <p v-if="error">{{ error.message }}</p>

    <div v-if="sets.length === 0" class="set-no-results">
        There's no lego sets to be presented here!
    </div>

    <div v-else class="table-container">
        <table class="table is-bordered is-striped is-narrow is-hoverable set-table">
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
                <tr v-for="set in sets" :key="set.set_num">
                    <td><img class="set-image" :src="set.set_img_url"></td>
                    <td>{{set.name}}</td>
                    <td>{{set.year}}</td>
                    <td>{{set.num_parts}}</td>
                    <td><RouterLink class="button is-light" :to="`sets/${set.set_num}`">More Detail</RouterLink></td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<script setup lang="ts">
defineProps(['loading', 'error', 'sets']);
</script>

<style scoped lang="scss">
.set-table {
    width: 100%;
}
.set-image {
    max-width: 200px;
}
</style>