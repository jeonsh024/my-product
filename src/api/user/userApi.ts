import { instance } from '@/services/axios/index'

export const requestLogin = (id: string, pwd: string) => {
  return instance.post('/member/login', { id: id, password: pwd })
}
