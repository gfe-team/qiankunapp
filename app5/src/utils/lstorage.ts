// 默认缓存期限为7天
const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7

// 创建本地缓存对象
export const createStorage = ({ prefixKey = '', storage = localStorage } = {}) => {
  // 本地缓存类
  const Storage = class {
    private storage = storage
    private prefixKey?: string = prefixKey

    private getKey(key: string) {
      return `${this.prefixKey}${key}`.toUpperCase()
    }

    // 设置缓存
    set(key: string, value: string, expire: number | null = DEFAULT_CACHE_TIME) {
      const stringData = JSON.stringify({
        value,
        expire: expire !== null ? new Date().getTime() + expire * 1000 : null
      })
      this.storage.setItem(this.getKey(key), stringData)
    }

    // 读取缓存
    get(key: string, def: string | null = null) {
      const item = this.storage.getItem(this.getKey(key))
      if (item) {
        try {
          const data = JSON.parse(item)
          const { value, expire } = data
          // 在有效期内直接返回
          if (expire === null || expire >= Date.now()) {
            return value
          }
          this.remove(this.getKey(key))
        } catch (e) {
          return def
        }
      }
      return def
    }

    // 从缓存删除某项
    remove(key: string) {

      this.storage.removeItem(this.getKey(key))
    }

    // 清空所有缓存
    clear(): void {
      
      this.storage.clear()
    }

    // 设置cookie
    setCookie(name: string, value: string | number, expire: number | null = DEFAULT_CACHE_TIME) {
      document.cookie = `${this.getKey(name)}=${value}; Max-Age=${expire}`
    }

    // 根据名字获取cookie值
    getCookie(name: string): string {
      const cookieArr = document.cookie.split('; ')
      for (let i = 0, length = cookieArr.length; i < length; i++) {
        const kv = cookieArr[i].split('=')
        if (kv[0] === this.getKey(name)) {
          return kv[1]
        }
      }
      return ''
    }

    // 根据名字删除指定的cookie
    removeCookie(key: string) {
      this.setCookie(key, 1, -1)
    }

    // 清空cookie，使所有cookie失效
    clearCookie(): void {
      const keys = document.cookie.match(/[^ =;]+(?==)/g)
      if (keys) {
        for (let i = keys.length; i--;) {
          document.cookie = keys[i] + '=0;expire=' + new Date(0).toUTCString()
        }
      }
    }
  }
  return new Storage()
}

export const storage = createStorage();

export default Storage;
