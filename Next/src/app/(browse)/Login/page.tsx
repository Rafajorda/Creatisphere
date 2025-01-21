import { Metadata, NextPage } from 'next'
import  Link  from 'next/link'
import SignForm from '@/components/user/SignForm'

export const metadata: Metadata = {
    title: 'Login',
  }

const Login: NextPage = () => {
    return (
      <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-center text-2xl font-bold mb-4">{('sign-up')}</h1>
          <p className="text-center text-gray-600 mb-6">
            <Link href="/Register" className="text-blue-500 hover:underline">
              {('need-account')}
            </Link>
          </p>
          <SignForm/>
        </div>
      </div>
    </>
    )
  }
  export default Login
  