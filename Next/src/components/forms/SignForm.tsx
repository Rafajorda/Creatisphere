"use client"

import { signIn } from "next-auth/react"
import type React from "react"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { fetchWrapper } from "@/utils/fetch"

interface UserForm {
  username: string
  email: string
  password: string
  repeatpassword: string
}
interface SignFormProps {
  isRegister?: boolean
}

const SignForm = ({ isRegister }: SignFormProps) => {
  const [user, setUser] = useState<UserForm>({
    username: "",
    email: "",
    password: "",
    repeatpassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const onFieldChange = (val: Partial<UserForm>) => {
    setUser({ ...user, ...val })
  }

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callback")

  const handleSignIn = async () => {
    const result = await signIn("credentials", {
      email: user.email,
      password: user.password,
      redirect: false, // Evita la redirección automática
      callbackUrl: callbackUrl ? callbackUrl : "/",
    })
    console.log("Sign-in result:", result)
    if (!result) {
      console.error("Sign-in result is undefined")
      setErrors(["Sign-in failed: No response from server"])
      return
    }

    if (result.error) {
      console.error("Error during sign-in:", result.error)
      setErrors([result.error])
      return
    }

    if (result.ok) {
      console.log("Sign-in successful:", result)
      window.location.href = result.url || "/"
    } else {
      console.error("Unexpected sign-in result:", result)
      setErrors(["Unexpected error during sign-in"])
    }
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isRegister) {
      if (user.password !== user.repeatpassword) {
        setErrors(["Passwords do not match"])
        return
      }
      const formData = { user }
      try {
        setLoading(true)
        // await fetchWrapper('/api/users', 'POST', formData).then(handleSignIn)
        await fetchWrapper("/api/users", "POST", formData).then(() => {
          window.location.href = "/Login"
        })
      } catch (e: any) {
        setErrors(e.errors)
        // console.log("error"+e.errors);
      } finally {
        setLoading(false)
      }
    } else {
      await handleSignIn()
    }
  }

  return (
    <>
      {/* <ListErrors errors={errors} /> */}
      <form onSubmit={handleFormSubmit} className="space-y-4">
        {isRegister && (
          <fieldset className="form-group mb-4">
            <input
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-teal-400"
              type="text"
              name="username"
              placeholder={"username"}
              data-testid="input-username"
              value={user.username}
              onChange={(e) => onFieldChange({ username: e.target.value })}
              disabled={loading}
            />
          </fieldset>
        )}
        <fieldset className="form-group mb-4">
          <input
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-teal-400"
            type="text"
            name="email"
            placeholder={"email"}
            data-testid="input-email"
            value={user.email}
            onChange={(e) => onFieldChange({ email: e.target.value })}
            disabled={loading}
          />
        </fieldset>
        <fieldset className="form-group mb-4">
          <input
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-teal-400"
            type="password"
            name="password"
            placeholder={"password"}
            data-testid="input-password"
            value={user.password}
            onChange={(e) => onFieldChange({ password: e.target.value })}
            disabled={loading}
          />
        </fieldset>
        {isRegister && (
          <fieldset className="form-group mb-4">
            <input
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-teal-400"
              type="password"
              name="repeat password"
              placeholder={"repeat password"}
              data-testid="input-repeatpassword"
              value={user.repeatpassword}
              onChange={(e) => onFieldChange({ repeatpassword: e.target.value })}
              disabled={loading}
            />
          </fieldset>
        )}

        <button
          className="w-full px-4 py-2 font-bold text-white bg-teal-400 rounded-lg hover:bg-teal-200 focus:outline-none focus:shadow-outline"
          data-testid="btn-submit"
          disabled={loading}
        >
          {isRegister ? "Register" : "Login"}
        </button>
      </form>
    </>
  )
}

export default SignForm

