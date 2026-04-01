/** Публичная ссылка на веб-приложение сканирования. */
export const SCAN_APP_URL = 'https://app.scan.mobilemed.ai'

export function buildScanAppUrl(authId: string): string {
  if (!authId) {
    return SCAN_APP_URL
  }

  const url = new URL(SCAN_APP_URL)
  url.searchParams.set('id', authId)
  return url.toString()
}
