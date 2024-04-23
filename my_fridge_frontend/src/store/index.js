import { createPinia, defineStore } from 'pinia';

export const useStore = defineStore('main', {
    state: () => ({
        accountTokenId: null,
        homeNanoId: null
    }),
    actions: {
        setAccountTokenId(token) {
            this.accountTokenId = token;
        },
        setHomeNanoId(id) {
            this.homeNanoId = id;
        }
    }
});

export default createPinia();
