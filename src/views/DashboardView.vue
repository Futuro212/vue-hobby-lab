<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
            <div class="card">
                <div v-if="user.loggedIn">

                <div class="card-header">Welcome, {{user.data.displayName}}</div>
                <div class="card-body">
                <div class="alert alert-success" role="alert">
                    You are logged in!
                <div class="my-4">
                        <button  @click.prevent="signOut" class="btn btn-primary">Log Out</button>
                </div>
                    </div>
                </div>

                </div>
                <div v-else class="alert alert-danger" role="alert">
                    You are not logged in! 
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useRouter } from "vue-router";
    import { useAuthStore } from '../stores/auth'
    import { auth } from '@/firebase/init';
    import { storeToRefs } from 'pinia'
    
    const store = useAuthStore()
    const router = useRouter()

    auth.onAuthStateChanged(user => {
        store.fetchUser(user);
    });

    const { user } = storeToRefs(store);

    const signOut = async () => {
        await store.logOut();
        router.push('/')
    }
</script>

<style>
    
</style>