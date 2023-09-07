function updateOptions(options) {
    const update = { ...options };
    update.headers = {
    ...update.headers,
    Authorization: `key ${import.meta.env.VITE_REBRICKABLE_API_KEY}`,
    };
    return update;
  }
  
  export default function rebrickableFetch(url, options ?: any) {
    return fetch(url, updateOptions(options));
  }