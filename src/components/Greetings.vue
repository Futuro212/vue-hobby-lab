<template>
    <div class="card">
        <div class="card-content">
            <p class="title">
                Vue-Hobby-Lab
            </p>

            <p>
                This is the place to search for the immense lego world, check the lego collections.
            </p>

            <br/>

            <p v-if="!user.loggedIn">
                Create an account <RouterLink to="/register">here</RouterLink> or login <RouterLink to="/login">here</RouterLink> so you can save the lego sections that you own and also the ones you want for your personal collection.
            </p>
            <p v-else>
                You have <b>{{ user.wishlist.length }} sets</b> on <RouterLink to="/wishlist">wishlist</RouterLink> and you <RouterLink to="/owned">own</RouterLink> <b>{{ user.owned.length }} sets</b>.
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

const store = useAuthStore();
const { user } = storeToRefs(store);
</script>

<style scoped lang="scss">
.card {
    width: 90%;
}
</style>