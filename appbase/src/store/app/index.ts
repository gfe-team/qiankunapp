import { defineStore } from "pinia";
import { actions } from './actions';
import { getters } from './getters';
import { state } from './state';

export const useAppStore = defineStore({
    id: 'webapp',
    state() {
        return {
            ...state,
        };
    },
    getters,
    actions
});
