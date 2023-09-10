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
                    <button 
                        class="button"
                        @click.prevent="hasOwned? removeOfOwned(set.set_num): addtoOwned(set.set_num)"
                        :class="{
                            'is-primary is-light': !hasOwned,
                            'is-success': hasOwned
                            }"
                    >
                        {{ hasOwned? 'Owned' : 'Own it?' }}
                    </button>
                    <button 
                        class="button"
                        @click.prevent="hasWishlist? removeOfWishlist(set.set_num): addtoWishlist(set.set_num)"
                        :class="{
                            'is-primary is-light': !hasWishlist,
                            'is-success': hasWishlist
                            }"
                    >
                        {{ hasWishlist? 'Wishlisted' : 'Wishlist it?' }}
                    </button>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useSetStore } from '@/stores/set';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const route = useRoute() ;
const { set, loading, error } = storeToRefs(useSetStore());
const { fetchSet } = useSetStore();

fetchSet(route.params.id);

// wishlist and owned feature
const { user } = storeToRefs(useAuthStore());
const { addtoWishlist, removeOfWishlist, addtoOwned, removeOfOwned} = useAuthStore();

const hasOwned = computed(() => {
    return user.value.owned.includes(set.value.set_num);
});

const hasWishlist = computed(() => {
    return user.value.wishlist.includes(set.value.set_num);
});

</script>

<style scoped lang="scss">
.set-title {
    text-align: center;
}

.set-image {
    max-width: 100%
}

</style>