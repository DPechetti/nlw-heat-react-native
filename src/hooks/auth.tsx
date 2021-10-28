import React, { createContext, useContext, useEffect, useState } from "react"
import * as AuthSessions from 'expo-auth-session'
import { api } from "../services/api"
import AsyncStorage from "@react-native-async-storage/async-storage"

const CLIENT_ID = "439c700356248930788c"
const SCOPE = "user"
const USER_STORAGE = '@mobile:user'
const TOKEN_STORAGE = '@mobile:token'

type User = {
  id: string;
  avatar_url: string;
  name: string;
  login: string;
}

type AuthContextData = {
  user: User | null;
  isSignedIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

type AuthProviderProps = {
  children: React.ReactNode;
}

type AuthResponse = {
  token: string;
  user: User;
}

type AuthorizationResponse = {
  params: {
    code?: string;
    error?: string;
  }
  type?: string;
}

const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const [isSignedIn, setIsSignedIn] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  async function signIn() {
    try {
      setIsSignedIn(true)

      const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`
      const returnUrl = 'exp://192.168.100.72:19000' 
      // without returnUrl does not work
      // https://docs.expo.dev/versions/v42.0.0/sdk/auth-session/#authsessionstartasyncoptions

      const { params: { code, error }, type } = await AuthSessions.startAsync({ authUrl, returnUrl }) as AuthorizationResponse
      console.log({code, error, type})
      
      if (type === 'success' && error !== 'access_denied') {
        const authResponse = await api.post('/authenticate', { code })
        const { user, token } = authResponse.data as AuthResponse

        api.defaults.headers.common.authorization = `Bearer ${token}`

        await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
        await AsyncStorage.setItem(TOKEN_STORAGE, JSON.stringify(token))

        setUser(user)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsSignedIn(false)
    }
  }

  async function signOut() {
    setUser(null)

    await AsyncStorage.removeItem(USER_STORAGE)
    await AsyncStorage.removeItem(TOKEN_STORAGE)
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const userStorage = await AsyncStorage.getItem(USER_STORAGE)
      const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE)

      if (userStorage && tokenStorage) {
        api.defaults.headers.common.authorization = `Bearer ${tokenStorage}`

        setUser(JSON.parse(userStorage))
      }

      setIsSignedIn(false)
    }

    loadUserStorageData()
  }, [])

  return(
    <AuthContext.Provider value={{ signIn, signOut, user, isSignedIn }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export { useAuth, AuthProvider }