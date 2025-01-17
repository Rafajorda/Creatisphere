/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, { AxiosRequestConfig } from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

const basicOptions: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
}

export const fetchWrapper = async <T = any>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: any,
  options?: AxiosRequestConfig,
) => {
  try {
    const resp = await axios({
      url: `${BASE_URL}${url}`,
      method,
      data: body,
      ...basicOptions,
      ...options,
    })
    return resp.data as T
  } catch (e: any) {
    if (e.response) {
      throw {
        status: e.response.status,
        statusText: e.response.statusText,
        errors: e.response.data.errors,
      }
    } else {
      throw { errors: ['Something went wrong'] }
    }
  }
}
