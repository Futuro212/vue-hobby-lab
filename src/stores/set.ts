import { defineStore } from 'pinia';
import rebrickableFetch from '@/utils/RebrickableFetch';

export const useSetStore = defineStore({
  id: 'set',
  state: () => ({
    sets: [],
    set: null,
    loading: false,
    error: null,
    pageSize: 5,
    page: 1,
    search: ""
  }),
  actions: {
    async fetchSets() {
      this.sets = []
      this.loading = true
      try {
        const searchParams = new URLSearchParams();
        searchParams.append("page", this.page.toString());
        searchParams.append("page_size", this.pageSize.toString());
        searchParams.append("search", this.search);
        this.sets = await rebrickableFetch(`https://rebrickable.com/api/v3/lego/sets/?${searchParams.toString()}`).then((response) => response.json()) 
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    setPageSize(pageSize: number) {
      this.pageSize = pageSize;
    },
    setPageNumber(pageNumber: number) {
      this.page = pageNumber;
    },
    // async fetchPost(id) {
    //   this.post = null
    //   this.loading = true
    //   try {
    //     this.post = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    //     .then((response) => response.json())
    //   } catch (error) {
    //     this.error = error
    //   } finally {
    //     this.loading = false
    //   }
    // }
  }
})