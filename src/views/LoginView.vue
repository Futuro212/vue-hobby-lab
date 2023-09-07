<template>
    <div>LOGIN</div>
    <div v-if="error" class="alert alert-danger">{{error}}</div>
            <form action="#"  @submit.prevent="Login">
              <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>

                <div class="col-md-6">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    name="email"
                    value
                    required
                    autofocus
                    v-model="email"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                <div class="col-md-6">
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    name="password"
                    required
                    v-model="password"
                  />
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button type="submit" class="btn btn-primary">Login</button>
                </div>
              </div>
            </form>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useRouter } from 'vue-router'
    import { useAuthStore } from '../stores/auth'

    const email = ref('')
    const password = ref('')
    const error = ref(null)

    const store = useAuthStore()
    const router = useRouter()

    const Login = async () => {
        try {
            await store.login({email: email.value, password: password.value});
            router.push("/");
        } catch (err) {
            error.value = err.message;
        }
    }

</script>

<style>
    
</style>