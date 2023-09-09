
import { defineStore } from 'pinia'
import { auth } from '@/firebase/init';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { createUser, getUser } from '@/firebase/db';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    _user: {
      loggedIn: false,
      data: null,
      wishlist: new Set(),
      owned: new Set()
    }
  }),
  getters: {
    user: (state) =>  {
      return state._user;
    }
  },
  actions: {
    //add to wishlist
    //remove of wishlist
    //add to owned
    //remove of owned


    setLoggedIn(value) {
      this._user.loggedIn = value;
    },
    setUser(value) {
      this._user.data = value;
    },
    async register({email, password, name}) {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      if (response) {
        // get the firestore id
        const userId = createUser(email, {wishlist: {} , owned: {}});

        // create the data for the store
        const newUserData = {...response.user, ...{displayName: name}, userId: userId};
        this.setUser(newUserData);

        //update display name on firebase
        updateProfile(response.user, {displayName: name});
      } else {
          throw new Error('Unable to register user')
      }
    },
    async login({email, password}) {
      const response = await signInWithEmailAndPassword(auth, email, password)
      if (response) {
        this.setUser(response.user);

        //get wishlist and owned lists
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
