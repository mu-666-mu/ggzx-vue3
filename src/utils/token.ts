// 封装本地存储数据与读取数据的方法
// 存储token到本地
export const setToken = (token: string) => {
  localStorage.setItem('TOKEN', token)
}
// 获取本地存储的token
export const getToken = (): string | null => {
  return localStorage.getItem('TOKEN')
}
//本地存储删除数据方法
export const REMOVE_TOKEN = () => {
  localStorage.removeItem('TOKEN')
}
