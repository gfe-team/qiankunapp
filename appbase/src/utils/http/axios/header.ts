import { useUserStore } from "@/store/user";
const userStore = useUserStore();


export const headers = {
    Authorization: `Bearer ${userStore.token}`
}