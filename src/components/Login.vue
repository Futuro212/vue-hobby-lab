<template>
    <div class="card">
        <div class="card-content">
            <p class="title">
                Login
            </p>
            
            <div v-if="error" class="error">{{error}}</div>

            <form action="#" @submit.prevent="LoginSubmit">
                <div class="field">
                    <label class="label" for="email">Email</label>
                    <div class="control">
                        <input 
                            id="email" 
                            type="email" 
                            class="input"
                            :class="{'is-danger': error}"
                            name="email"
                            placeholder="Email" 
                            value
                            required
                            autofocus
                            v-model="email"
                        />
                    </div>
                </div>
                <div class="field">
                    <label class="label" for="password">Password</label>
                    <div class="control">
                        <input
                            id="password"
                            type="password"
                            class="input"
                            :class="{'is-danger': error}"
                            name="password"
                            required
                            v-model="password"
                        />
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <button type="submit"  class="button is-link">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const email = ref('')
const password = ref('')
const error = ref('')

const store = useAuthStore()
const router = useRouter()

const LoginSubmit = async () => {
    try {
        await store.login({email: email.value, password: password.value});
        router.push("/");
    } catch (err) {
        error.value = err instanceof Error? err.message: String(err);
    }
}
</script>

<style scoped lang="scss">
.card {
    margin-left: 3em;
    margin-right: 3em;
    min-width: 350px;
}

.error {
    color: red;
    margin-bottom: 1.5rem;
    font-weight: bold;
}
</style>