'use client'
import { requestLogin } from '@/api/user/userApi.ts'
import { Button } from '@components/ui/button.tsx'

const Login = () => {
  const [id, setId] = useState('')
  const [pwd, setPwd] = useState('')

  const handleLogin = async () => {
    if (!id) {
      alert('id 입력해주세요')
      return
    }
    try {
      const res = await requestLogin(id, pwd)
      console.log('로그인 성공:', res.data)
      // 예: localStorage.setItem('access_token', response.data.token)
    } catch (error) {
      console.error('로그인 실패:', error)
    }
  }

  return (
    <div className="w-full h-16 px-6 flex items-center justify-between border-b border-gray-200 bg-white shadow-sm sticky top-0 z-50">
      <div className="space-x-2">
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="아이디"
          className="border px-2 py-1 rounded"
        />
        <input
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          placeholder="비밀번호"
          className="border px-2 py-1 rounded"
        />

        <Button className="text-black" onClick={handleLogin}>
          로그인
        </Button>
      </div>
    </div>
  )
}

export default Login
