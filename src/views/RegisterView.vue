<template>
    <div>REGISTER</div>
    <div v-if="error" class="alert alert-danger">{{error}}</div>
    <div>
        <form action="#" @submit.prevent="Register">
              <div class="form-group row">
                <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>

                <div class="col-md-6">
                  <input
                    id="name"
                    type="name"
                    class="form-control"
                    name="name"
                    value
                    required
                    autofocus
                    v-model="name"
                  />
                </div>
              </div>

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
                  <button type="submit" class="btn btn-primary">Register</button>
                </div>
              </div>
            </form>

    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useRouter } from 'vue-router'
    import { useAuthStore } from '../stores/auth'

    const name = ref('')
    const email = ref('')
    const password = ref('')
    const error = ref(null)

    const store = useAuthStore()
    const router = useRouter()

    const Register = async () => {
        try {
            await store.register({email: email.value, password: password.value, name: name.value});
            router.push('/');
        } catch (err) {
            error.value = err.message
        }
    }


</script>

<style>
    
</style>