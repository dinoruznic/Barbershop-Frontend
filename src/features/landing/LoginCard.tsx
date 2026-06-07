import { useState, type FormEvent } from 'react'
import type {
  AuthFormErrors,
  AuthMode,
  LoginFormValues,
  RegisterFormValues,
} from '../auth/authTypes'
import { validateLogin, validateRegister } from '../auth/authValidation'

interface LoginCardProps {
  mode: AuthMode
  highlighted?: boolean
}

const initialLoginValues: LoginFormValues = {
  email: '',
  password: '',
}

const initialRegisterValues: RegisterFormValues = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

function LoginCard({ mode, highlighted = false }: LoginCardProps) {
  const isLogin = mode === 'login'
  const [loginValues, setLoginValues] =
    useState<LoginFormValues>(initialLoginValues)
  const [registerValues, setRegisterValues] =
    useState<RegisterFormValues>(initialRegisterValues)
  const [loginErrors, setLoginErrors] =
    useState<AuthFormErrors<LoginFormValues>>({})
  const [registerErrors, setRegisterErrors] =
    useState<AuthFormErrors<RegisterFormValues>>({})

  const handleLoginChange = (field: keyof LoginFormValues, value: string) => {
    setLoginValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }))
    setLoginErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }))
  }

  const handleRegisterChange = (
    field: keyof RegisterFormValues,
    value: string,
  ) => {
    setRegisterValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }))
    setRegisterErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isLogin) {
      const errors = validateLogin(loginValues)
      setLoginErrors(errors)

      if (Object.keys(errors).length === 0) {
        console.log('LOGIN DATA', loginValues)
      }

      return
    }

    const errors = validateRegister(registerValues)
    setRegisterErrors(errors)

    if (Object.keys(errors).length === 0) {
      console.log('REGISTER DATA', registerValues)
    }
  }

  return (
    <section
      id="login-card"
      className={`rounded-2xl border border-amber-200/20 bg-stone-950/75 p-6 backdrop-blur-xl transition-all duration-500 ${
        highlighted
          ? 'ring-2 ring-amber-200 shadow-[0_0_45px_rgba(245,213,145,0.35)]'
          : 'shadow-[0_0_55px_rgba(245,213,145,0.14)]'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-amber-200/70">
            Pristup aplikaciji
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-stone-50">
            {isLogin ? 'Prijava' : 'Registracija'}
          </h2>
        </div>

        <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-medium text-emerald-100">
          Online
        </span>
      </div>

      <form className="mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
        {!isLogin && (
          <label className="grid gap-2 text-sm text-stone-300">
            Ime i prezime
            <input
              type="text"
              value={registerValues.fullName}
              onChange={(event) =>
                handleRegisterChange('fullName', event.target.value)
              }
              placeholder="Unesite ime i prezime"
              className="rounded-2xl border border-stone-700 bg-black/35 px-4 py-3 text-stone-100 outline-none transition placeholder:text-stone-500 focus:border-amber-200/60 focus:ring-2 focus:ring-amber-200/10"
            />
            {registerErrors.fullName && (
              <span className="text-xs font-medium text-red-300">
                {registerErrors.fullName}
              </span>
            )}
          </label>
        )}

        <label className="grid gap-2 text-sm text-stone-300">
          Email
          <input
            type="email"
            value={isLogin ? loginValues.email : registerValues.email}
            onChange={(event) =>
              isLogin
                ? handleLoginChange('email', event.target.value)
                : handleRegisterChange('email', event.target.value)
            }
            placeholder="ime@email.com"
            className="rounded-2xl border border-stone-700 bg-black/35 px-4 py-3 text-stone-100 outline-none transition placeholder:text-stone-500 focus:border-amber-200/60 focus:ring-2 focus:ring-amber-200/10"
          />
          {(isLogin ? loginErrors.email : registerErrors.email) && (
            <span className="text-xs font-medium text-red-300">
              {isLogin ? loginErrors.email : registerErrors.email}
            </span>
          )}
        </label>

        <label className="grid gap-2 text-sm text-stone-300">
          Lozinka
          <input
            type="password"
            value={isLogin ? loginValues.password : registerValues.password}
            onChange={(event) =>
              isLogin
                ? handleLoginChange('password', event.target.value)
                : handleRegisterChange('password', event.target.value)
            }
            placeholder="••••••••"
            className="rounded-2xl border border-stone-700 bg-black/35 px-4 py-3 text-stone-100 outline-none transition placeholder:text-stone-500 focus:border-amber-200/60 focus:ring-2 focus:ring-amber-200/10"
          />
          {(isLogin ? loginErrors.password : registerErrors.password) && (
            <span className="text-xs font-medium text-red-300">
              {isLogin ? loginErrors.password : registerErrors.password}
            </span>
          )}
        </label>

        {!isLogin && (
          <label className="grid gap-2 text-sm text-stone-300">
            Potvrdi lozinku
            <input
              type="password"
              value={registerValues.confirmPassword}
              onChange={(event) =>
                handleRegisterChange('confirmPassword', event.target.value)
              }
              placeholder="••••••••"
              className="rounded-2xl border border-stone-700 bg-black/35 px-4 py-3 text-stone-100 outline-none transition placeholder:text-stone-500 focus:border-amber-200/60 focus:ring-2 focus:ring-amber-200/10"
            />
            {registerErrors.confirmPassword && (
              <span className="text-xs font-medium text-red-300">
                {registerErrors.confirmPassword}
              </span>
            )}
          </label>
        )}

        {isLogin && (
          <a
            href="#login-card"
            className="text-sm font-medium text-amber-100 transition hover:text-[#d6b56c]"
          >
            Zaboravljena lozinka?
          </a>
        )}

        <button
          type="submit"
          className="rounded-2xl bg-amber-200 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-emerald-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d6b56c] hover:shadow-lg"
        >
          {isLogin ? 'Prijavi se' : 'Kreiraj nalog'}
        </button>
      </form>
    </section>
  )
}

export default LoginCard
