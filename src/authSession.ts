const AUTH_RESPONSE_KEY = 'landing_auth_response'
const AUTH_ID_KEY = 'landing_auth_id'

export type AuthLoginResponse = {
  id: string
  utm: string
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
}

export function readStoredAuthId(): string {
  return window.localStorage.getItem(AUTH_ID_KEY) ?? ''
}

export function getUtmLabelFromLocation(search: string): string {
  const params = new URLSearchParams(search)
  const utmValue = params.get('utm')
  const infoValue = params.get('info')

  if (utmValue && infoValue) {
    return `utm=${utmValue}&info=${infoValue}`
  }
  if (utmValue) {
    return `utm=${utmValue}`
  }
  if (infoValue) {
    return `info=${infoValue}`
  }

  return ''
}
