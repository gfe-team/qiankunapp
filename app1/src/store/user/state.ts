import { getToken, getUserinfo } from "@/utils/access.token"

export type IUserState = {
  token: string;
  userinfo: string,
}
export const state: IUserState = {
  token: getToken(),
  userinfo: getUserinfo() || "{}"
}