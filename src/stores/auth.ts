
import { defineStore } from 'pinia'
import { auth } from '@/firebase/init';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    _user: {
      loggedIn: false,
      data: null
    }
  }),
  getters: {
    user: (state) =>  {
      return state._user;
    }
  },
  actions: {
    setLoggedIn(value) {
      this._user.loggedIn = value;
    },
    setUser(value) {
      this._user.data = value;
    },
    async register({email, password, name}) {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      if (response) {
        const newUserData = {...response.user, ...{displayName: name}}
        this.setUser(newUserData);
        updateProfile(response.user, {displayName: name});
      } else {
          throw new Error('Unable to register user')
      }
    },
    async login({email, password}) {
      const response = await signInWithEmailAndPassword(auth, email, password)
        if (response) {
          this.setUser(response.user);
        } else {
          throw new Error('login failed')
        }
    },
    async logOut(){
      await signOut(auth)
      this.setUser(null)
    },
    async fetchUser(user) {
      this.setLoggedIn( user !== null);
      if (user) {
        this.setUser({
          displayName: user.displayName,
          email: user.email
        });
      } else {
        this.setUser(null);
      }
  }
  }
});
