import { useMemo } from 'react'
import { getStoredUser } from '../api/authApi'
import type { AppUser } from '../types/auth'
import { getPrimaryRole, hasRole } from '../utils/roles'

export function useAuthUser() {
  const user = useMemo<AppUser | null>(() => getStoredUser(), [])
  const primaryRole = getPrimaryRole(user)

  return {
    user,
    primaryRole,
    isClient: hasRole(user, 'CLIENT') || !user,
    hasRole: (role: string) => hasRole(user, role),
  }
}
