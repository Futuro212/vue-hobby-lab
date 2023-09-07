<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">

      <RouterLink class="navbar-item" to="/">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/500px-LEGO_logo.svg.png?20221012140704" width="54">
      </RouterLink>

      <button role="button" @click="toggleNav" class="navbar-burger" :class="{'is-active': mobileNavIsActive}" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>
    </div>

    <div id="navbarBasicExample" :class="{'is-active': mobileNavIsActive}" class="navbar-menu">
      <div class="navbar-start">
        <RouterLink class="navbar-item" to="/">Home</RouterLink>

        <a v-if="user.loggedIn" class="navbar-item">
          My Legos
        </a>

        <a class="navbar-item">
          Documentation
        </a>

      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <div class="logged-out-section" v-if="!user.loggedIn">
              <RouterLink class="button is-primary" to="/register"><strong>Sign up</strong></RouterLink>
              <RouterLink class="button is-light" to="/login">Login</RouterLink>
            </div>
            <div class="logged-in-section" v-else>
              <p class="greeting-message">Greetings {{ user.data.displayName }}</p>
              <button @click.prevent="signOut" class="button is-danger">Log Out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <RouterView />
</template>

<script setup lang="ts">
  import { RouterLink, RouterView, useRouter } from 'vue-router'
  import { ref } from 'vue';
  import { useAuthStore } from '@/stores/auth';
  import { auth } from '@/firebase/init';
  import { storeToRefs } from 'pinia';

  const store = useAuthStore();
  const router = useRouter();

  auth.onAuthStateChanged(user => {
    store.fetchUser(user);
  });

  const { user } = storeToRefs(store);
  const mobileNavIsActive = ref(false);

  const toggleNav = () => {mobileNavIsActive.value = !mobileNavIsActive.value }

  const signOut = async () => {
    await store.logOut();
    router.push('/')
  }
</script>


<style lang="scss">
@import "../node_modules/bulma/bulma";
.navbar-burger {
  align-self: center;
}

.navbar-item img {
    max-height: unset; 
}

.logged-in-section {
  display: flex;
}

.greeting-message {
  align-self: center;
  margin-right: 0.5em;
  padding-bottom: 5px;
}
</style>
