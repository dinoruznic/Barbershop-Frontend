import type {
  AuthFormErrors,
  LoginFormValues,
  RegisterFormValues,
} from './authTypes'

const validateEmail = (email: string) => {
  if (!email.trim()) {
    return 'Email je obavezan.'
  }

  if (!email.includes('@')) {
    return 'Email mora sadržavati @.'
  }

  return undefined
}

const validatePassword = (password: string) => {
  if (!password) {
    return 'Lozinka je obavezna.'
  }

  if (password.length < 6) {
    return 'Lozinka mora imati najmanje 6 karaktera.'
  }

  return undefined
}

export function validateLogin(values: LoginFormValues) {
  const errors: AuthFormErrors<LoginFormValues> = {}
  const emailError = validateEmail(values.email)
  const passwordError = validatePassword(values.password)

  if (emailError) {
    errors.email = emailError
  }

  if (passwordError) {
    errors.password = passwordError
  }

  return errors
}

export function validateRegister(values: RegisterFormValues) {
  const errors: AuthFormErrors<RegisterFormValues> = {
    ...validateLogin(values),
  }

  if (!values.fullName.trim()) {
    errors.fullName = 'Ime i prezime je obavezno.'
  }

  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Lozinke se ne poklapaju.'
  }

  return errors
}
