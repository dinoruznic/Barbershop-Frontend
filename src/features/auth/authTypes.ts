export type AuthMode = 'login' | 'register'

export interface LoginFormValues {
  email: string
  password: string
}

export interface RegisterFormValues extends LoginFormValues {
  fullName: string
  confirmPassword: string
}

export type AuthFormErrors<T> = Partial<Record<keyof T, string>>
