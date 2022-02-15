import { defineStore } from "pinia";
import { actions } from './actions';
import { getters } from './getters';
import { state } from './state';


export const useUserStore = defineStore({
    id: 'user',
    state() {
        return {
            ...state,
        };
    },
    getters,
    actions
});
