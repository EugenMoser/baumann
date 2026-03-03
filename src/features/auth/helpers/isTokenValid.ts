export function isTokenValid(expiresAt: Date): boolean {
  // Check if the token is expired
  return new Date() <= expiresAt;
}
