
import { defineStore } from 'pinia'
import { auth } from '@/firebase/init';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, type User } from "firebase/auth";
import { createUser, getUser, updateUser } from '@/firebase/db';
import type { legoSet } from '@/types/set';
import type { registerData, loginData } from '@/types/authStore';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    _user: {
      loggedIn: false,
      data: {} as User | null,
      wishlist: [] as legoSet[],
      owned: [] as legoSet[]
    }
  }),
  getters: {
    user: (state) =>  {
      return state._user;
    }
  },
  actions: {
    addtoWishlist(newSet: legoSet) {
      const foundSet = this._user.wishlist.find((set: legoSet) => set.set_num === newSet.set_num);
      if (!foundSet) {

        this._user.wishlist.push(newSet);

        //set to firestore
        updateUser(this._user.data?.email as string, {  //since the user always have an email
          wishlist: this._user.wishlist
        })
      }
    },

    removeOfWishlist(newSet: legoSet) {
      const foundSetIndex = this._user.wishlist.findIndex((set) => set.set_num === newSet.set_num);
      if (foundSetIndex > -1) {
        this._user.wishlist.splice(foundSetIndex, 1);

        //set to firestore
        updateUser(this._user.data?.email as string, {  //since the user always have an email
          wishlist: this._user.wishlist
        })
      }
    },

    addtoOwned(newSet: legoSet) {
      const foundSet = this._user.owned.find((set) => set.set_num === newSet.set_num);
      if (!foundSet) {

        this._user.owned.push(newSet);

        //set to firestore
        updateUser(this._user.data?.email as string, {  //since the user always have an email
          owned: this._user.owned
        })
      }
    },

    removeOfOwned(newSet: legoSet) {
      const foundSetIndex = this._user.owned.findIndex((set) => set.set_num === newSet.set_num);
      if (foundSetIndex > -1) {
        this._user.owned.splice(foundSetIndex, 1);

        //set to firestore
        updateUser(this._user.data?.email as string, {  //since the user always have an email
          owned: this._user.owned
        })
      }
    },
    setLoggedIn(value: boolean) {
      this._user.loggedIn = value;
    },
    setUser(value: User | null) {
      this._user.data = value;
    },
    setWishlistAndOwnedSets(wishlistSet?: legoSet[], ownedSet?: legoSet[]) {
      if(wishlistSet) {
        this._user.wishlist = wishlistSet;
      }
      if(ownedSet) {
        this._user.owned = ownedSet;
      }
    },
    async register({email, password, name}: registerData) {
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
    async login({email, password}: loginData) {
      const response = await signInWithEmailAndPassword(auth, email, password)
      if (response) {
        this.setUser(response.user);

        // get user info about wishlist and owned sets
        const user = await getUser(email);
        this._user.wishlist = user?.wishlist;
        this._user.owned = user?.owned;
      } else {
        throw new Error('login failed')
      }
    },
    async logOut(){
      await signOut(auth)
      this.setUser(null)
    },
    async fetchUser(user: User | null) {
      this.setLoggedIn( user !== null);
      if (user) {

        // get user info about wishlist and owned sets
        const loadedUser = await getUser(user.email as string); //since the user always have an email
        this.setWishlistAndOwnedSets(loadedUser?.wishlist,loadedUser?.owned)

        this.setUser(user);
      } else {
        this.setUser(null);
      }
  }
  }
});
