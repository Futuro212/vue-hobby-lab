
import { defineStore } from 'pinia'
import { auth } from '@/firebase/init';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { createUser, getUser, updateUser } from '@/firebase/db';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    _user: {
      loggedIn: false,
      data: null,
      wishlist:  [],
      owned: []
    }
  }),
  getters: {
    user: (state) =>  {
      return state._user;
    }
  },
  actions: {
    addtoWishlist(id) {
      if (!this._user.wishlist.includes(id)) {

        this._user.wishlist.push(id);

        //set to firestore
        updateUser(this._user.data?.email, {
          wishlist: this._user.wishlist
        })
      }
    },

    removeOfWishlist(id) {
      if (this._user.wishlist.includes(id)) {

        const index = this._user.wishlist.indexOf(id);
        this._user.wishlist.splice(index, 1);

        //set to firestore
        updateUser(this._user.data?.email, {
          wishlist: this._user.wishlist
        })
      }
    },

    addtoOwned(id) {
      if (!this._user.owned.includes(id)) {

        this._user.owned.push(id);

        //set to firestore
        updateUser(this._user.data?.email, {
          owned: this._user.owned
        })
      }
    },

    removeOfOwned(id) {
      if (this._user.owned.includes(id)) {

        const index = this._user.owned.indexOf(id);
        this._user.owned.splice(index, 1);

        //set to firestore
        updateUser(this._user.data?.email, {
          owned: this._user.owned
        })
      }
    },
    setLoggedIn(value) {
      this._user.loggedIn = value;
    },
    setUser(value) {
      this._user.data = value;
    },
    setWishlistAndOwnedSets(wishlistSet, ownedSet) {
      this._user.wishlist = wishlistSet;
      this._user.owned = ownedSet;
    },
    async register({email, password, name}) {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      if (response) {
        // get the firestore id
        const userId = createUser(email, {wishlist: [] , owned: []});

        // create the data for the store
        const newUserData = {...response.user, ...{displayName: name}, userId: userId};
        this.setUser(newUserData);

        // update display name on firebase
        updateProfile(response.user, {displayName: name});
      } else {
          throw new Error('Unable to register user')
      }
    },
    async login({email, password}) {
      const response = await signInWithEmailAndPassword(auth, email, password)
      if (response) {
        this.setUser(response.user);

        // get user info about wishlist and owned sets
        const user = getUser(email);
        this._user.wishlist = user.wishlist;
        this._user.owned = user.owned;
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

        // get user info about wishlist and owned sets
        const loadedUser = await getUser(user.email);
        this.setWishlistAndOwnedSets(loadedUser?.wishlist,loadedUser?.owned)

        this.setUser({
          displayName: user.displayName,
          email: user.email,
        });
      } else {
        this.setUser(null);
      }
  }
  }
});
