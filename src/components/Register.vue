<template>
    <Background>
        <div class="card">
            <div class="card-content">
                <p class="title">
                    Sign up
                </p>
                
                <div v-if="error" class="error">{{error}}</div>

                <form action="#" @submit.prevent="RegisterSubmit">
                    <div class="field">
                        <label class="label" for="name">Username</label>
                        <div class="control">
                            <input 
                                id="name" 
                                type="name" 
                                class="input"
                                :class="{'is-danger': error}"
                                name="name"
                                placeholder="Username" 
                                value
                                required
                                autofocus
                                v-model="name"
                            />
                        </div>
                    </div>
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
    </Background>
</template>

<script setup lang="ts">
import Background from './Background.vue';

import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref(null)

const store = useAuthStore()
const router = useRouter()

const RegisterSubmit = async () => {
    try {
        await store.register({email: email.value, password: password.value, name: name.value});
        router.push('/');
    } catch (err) {
        error.value = err.message
    }
}
</script>

<style lang="scss">
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