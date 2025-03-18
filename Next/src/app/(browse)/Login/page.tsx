import { Metadata, NextPage } from 'next'
import Link from 'next/link'
import SignForm from '@/components/forms/SignForm'
import React from 'react'

export const metadata: Metadata = {
  title: 'Login',
}

const Login: NextPage = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md bg-zinc-200 p-10 rounded-lg shadow-md">
          <h1 className="text-center text-2xl font-bold mb-4">{('Login')}</h1>
          <p className="text-center text-gray-600 mb-6">
            <Link href="/Register" className="text-teal-400 font-bold hover:underline">
              {('Need an account?')}
            </Link>
          </p>
          <SignForm />
        </div>
      </div>
    </>
  )
}
export default Login
