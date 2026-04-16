const AUTH_RESPONSE_KEY = 'landing_auth_response'
const AUTH_ID_KEY = 'landing_auth_id'
const AUTH_TOKEN_KEY = 'landing_auth_token'

export type AuthLoginResponse = {
  id: string
  utm: string
  token?: string
}

export function readStoredAuthResponse(): AuthLoginResponse | null {
  const raw = window.localStorage.getItem(AUTH_RESPONSE_KEY)
  if (!raw) {
    return null
  }

  try {
    const parsed = JSON.parse(raw) as Partial<AuthLoginResponse>
    if (typeof parsed.id === 'string' && typeof parsed.utm === 'string') {
      return { id: parsed.id, utm: parsed.utm }
    }
  } catch {
    return null
  }

  return null
}

export function storeAuthResponse(response: AuthLoginResponse): void {
  window.localStorage.setItem(AUTH_RESPONSE_KEY, JSON.stringify(response))
  window.localStorage.setItem(AUTH_ID_KEY, response.id)
  if (typeof response.token === 'string' && response.token.length > 0) {
    window.localStorage.setItem(AUTH_TOKEN_KEY, response.token)
  }
}

export function readStoredAuthId(): string {
  return window.localStorage.getItem(AUTH_ID_KEY) ?? ''
}

export function readStoredAuthToken(): string {
  return window.localStorage.getItem(AUTH_TOKEN_KEY) ?? ''
}

export function getUtmLabelFromLocation(search: string): string {
  const params = new URLSearchParams(search)
  return params.get('utm') ?? ''
}

export function getAuthIdFromLocation(search: string): string {
  const params = new URLSearchParams(search)
  return params.get('id') ?? ''
}
