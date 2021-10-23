import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

type User = {
  id: string;
  avatar_url: string;
  name: string;
  login: string;
}

type AuthContextData = {
  user: User | null;
  signInUrl: string;
  signOut: () => void;
  goToPerfil: () => void;
  backToHome: () => void;
  renderPerfil: boolean
}

type AuthProvider = {
  children: ReactNode
}

type AuthResponse = {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  }
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider(props: AuthProvider) {
  const [user, setUser] = useState<User | null>(null)
  const [renderPerfil, setRenderPerfil] = useState(false)

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=2ed8ac14d0a398504d46`

  async function signIn(codeGithub: string) {
    const result = await api.post<AuthResponse>('/authenticate', { code: codeGithub })

    const { token, user } = result.data

    localStorage.setItem('token', token)

    api.defaults.headers.common.authorization = `Bearer ${token}`
    setUser(user)
  }

  function signOut() {
    setUser(null)
    localStorage.removeItem('token')
  }

  function goToPerfil() {
    setRenderPerfil(true)
    localStorage.setItem('RenderPerfil', JSON.stringify(!renderPerfil))
  }

  function backToHome() {
    setRenderPerfil(false)
    localStorage.setItem('RenderPerfil', JSON.stringify(!renderPerfil))
  }

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`

      api.get<User>('/profile').then(res => {
        setUser(res.data)
      })
    }

  }, [])

  useEffect(() => {
    const url = window.location.href
    const hasCode = url.includes('?code=');

    if (hasCode) {
      const [urlWithoutCode, codeGithub] = url.split('?code=')

      window.history.pushState({}, '', urlWithoutCode)

      signIn(codeGithub)
    }

  }, [])

  return (
    <AuthContext.Provider value={{
      signInUrl,
      user,
      signOut,
      renderPerfil,
      goToPerfil,
      backToHome
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}