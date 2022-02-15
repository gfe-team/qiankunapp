
import { ACCESS_MENU_INDEX, ACCESS_TOKEN, ACCESS_USERINFO } from "@/store/store.key";
import { storage } from '@/utils/lstorage';

export const getToken = (): string => storage.get(ACCESS_TOKEN);

export const setToken = (token: string): void => storage.set(ACCESS_TOKEN, token);

export const removeToken = (): void => storage.remove(ACCESS_TOKEN);

export const getUserinfo = (): string => storage.get(ACCESS_USERINFO, '');

export const setUserinfo = (userinfo: string): void => storage.set(ACCESS_USERINFO, userinfo);

export const removeUserinfo = (): void => storage.remove(ACCESS_USERINFO);

// 设置菜单选项
export const setMenuIndex = (activeIndex: string): void => storage.set(ACCESS_MENU_INDEX, activeIndex);

export const getMenuIndex = (): string => storage.get(ACCESS_MENU_INDEX);

export const removeMenuIndex = (): void => storage.remove(ACCESS_MENU_INDEX);