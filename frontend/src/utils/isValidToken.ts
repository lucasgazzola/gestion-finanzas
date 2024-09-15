export default async function isValidToken(token: string) {
  try {
    const response = await fetch(
      'http://localhost:3000/api/auth/validate-token',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (!response.ok) {
      return false
    }
    return true
    // Si la respuesta es exitosa, el token es válido
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    return false
  }
}
