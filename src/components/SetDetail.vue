<template>
    <p v-if="loading">Loading Sets...</p>
    <p v-if="error">{{ error.message }}</p>

    <div class="set-detail" v-if="set">
        <h1 class="title set-title">
            Lego Set {{ set.set_num }}
        </h1>
        <div class="set-data">
            <div class="set-image-container">
                <img class="set-image" :src="set.set_img_url">
            </div>
            
            <div class="set-data-values">
                <div><b>Name:</b>{{ set.name }}</div>
                <div><b>Year:</b>{{ set.year }}</div>
                <div><b>Number of Parts:</b>{{ set.num_parts }}</div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useSetStore } from '@/stores/set';
import { storeToRefs } from 'pinia';

const route = useRoute() ;
const { set, loading, error } = storeToRefs(useSetStore());
const { fetchSet } = useSetStore();


fetchSet(route.params.id);
</script>

<style scoped lang="scss">
.set-title {
    text-align: center;
}
.set-data {
    display: flex;
}

.set-image {
    max-width: 400px
}

.set-data-values {
    margin-left: 3em;
}


</style>