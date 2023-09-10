import { defineStore } from 'pinia';
import rebrickableFetch from '@/utils/RebrickableFetch';

export const useSetStore = defineStore({
  id: 'set',
  state: () => ({
    sets: [],
    set: null,
    loading: false,
    error: '',
    pageSize: 5,
    page: 1,
    search: ""
  }),
  actions: {
    async fetchSets() {
      this.sets = [];
      this.loading = true;
      this.error = '';
      try {
        const searchParams = new URLSearchParams();
        searchParams.append("page", this.page.toString());
        searchParams.append("page_size", this.pageSize.toString());
        searchParams.append("search", this.search);
        this.sets = await rebrickableFetch(`https://rebrickable.com/api/v3/lego/sets/?${searchParams.toString()}`).then((response) => response.json()) 
      } catch (error) {
        this.error = error instanceof Error? error.message: String(error)
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
    async fetchSet(setId: string) {
      this.sets = [];
      this.loading = true;
      this.error = '';
      try {
        this.set = await rebrickableFetch(`https://rebrickable.com/api/v3/lego/sets/${setId}/`).then((response) => response.json()) 
      } catch (error) {
        this.error = error instanceof Error? error.message: String(error)
      } finally {
        this.loading = false
      }
    }
  }
})