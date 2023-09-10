function updateOptions(options?: RequestInit) {
    const update = { ...options };
    update.headers = {
    ...update.headers,
    Authorization: `key ${import.meta.env.VITE_REBRICKABLE_API_KEY}`,
    };
    return update;
  }
  
  export default function rebrickableFetch(url: string, options?: RequestInit) {
    return fetch(url, updateOptions(options));
  }