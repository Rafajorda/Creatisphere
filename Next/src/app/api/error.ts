"use client"

import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import React, { useEffect } from 'react'

export class ApiResponse {
  static ok<T = unknown>(data: T): NextResponse {
    return NextResponse.json(data, { status: 200 })
  }

  static unauthorized(): NextResponse {
    return NextResponse.json({ errors: ['Unauthorized'] }, { status: 401 })
  }

  static badRequest(err: unknown) {
    return NextResponse.json(
      { errors: processErrorMessage(err) },
      { status: 400 },
    )
  }

  static notFound(message: string = 'Not Found') {
    return NextResponse.json({ errors: [message] }, { status: 404 })
  }

  static forbidden(): NextResponse {
    return NextResponse.json({ errors: ['Forbidden'] }, { status: 403 })
  }

  static noContent() {
    return NextResponse.json({}, { status: 200 })
  }
}

function processErrorMessage(err: unknown): string[] {
  if (typeof err === 'string') {
    return [err]
  } else if (Array.isArray(err)) {
    return err.map((e) => e.toString())
  } else if (err instanceof ZodError) {
    return err.issues.map((issue) => issue.message)
  }
  return ['Something went wrong']
}

// Componente de error para Next.js 15
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  // Determinar el tipo de error y mostrar el mensaje apropiado
  let errorMessage = "An unexpected error occurred"
  let statusCode = 500

  if (error instanceof Response) {
    statusCode = error.status
    switch (statusCode) {
      case 401:
        errorMessage = "Unauthorized"
        break
      case 403:
        errorMessage = "Forbidden"
        break
      case 404:
        errorMessage = "Not Found"
        break
      case 400:
        errorMessage = "Bad Request"
        break
    }
  } else if (error instanceof Error) {
    errorMessage = error.message
  }

  return (
    <div>
      <h2>Error {statusCode} </h2>
      < p > {errorMessage} </p>
      < button onClick={reset} > Try again </button>
    </div>
  )
}
