<template>
    <p v-if="loading">Loading Sets...</p>
    <p v-if="error">{{ error.message }}</p>

    <div class="set-detail" v-if="set">
        <h1 class="title set-title">
            Lego Set {{ set.set_num }}
        </h1>
        <div class="columns">
            <div class="column">
                <img class="set-image" :src="set.set_img_url">
            </div>
            <div class="column">
                <div class="set-data">
                    <p>
                        <b>Name:</b>
                    </p>
                    <p>
                        {{ set.name }}
                    </p>
                </div>
                <div class="set-data">
                    <p>
                        <b>Year:</b>
                    </p>
                    <p>
                        {{ set.year }}
                    </p>
                </div>
                <div class="set-data">
                    <p>
                        <b>Number of Parts:</b>
                    </p>
                    <p>
                        {{ set.num_parts }}
                    </p>
                </div>
                <div class="buttons">
                    <button class="button is-success">Owned</button>
                    <button class="button is-success">In Wishlist</button>
                </div>
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

.set-image {
    max-width: 100%
}

</style>