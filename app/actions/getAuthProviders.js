// app/actions/auth.js
'use server'

import { getProviders } from "next-auth/react"

export async function getAuthProviders() {
  try {
    const providers = await getProviders()
    return providers
  } catch (error) {
    console.error('Error fetching providers:', error)
    throw new Error('Failed to fetch providers')
  }
}