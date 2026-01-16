import { create } from "zustand"
import { persist } from "zustand/middleware"
import { apolloClient } from "@/lib/apollo"
import { LOGIN } from "@/lib/graphql/mutations/Login"
import { REGISTER } from "@/lib/graphql/mutations/Register"
import type { LoginInput, RegisterInput, User } from "@/types/user"

type RegisterMutationData = {
  register: {
    user: User
    token: string
    refreshToken: string
  }
}

type LoginMutationData = {
  login: {
    user: User
    token: string
    refreshToken: string
  }
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  signup: (data: RegisterInput) => Promise<boolean>
  login: (data: LoginInput) => Promise<boolean> 
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      signup: async (registerData: RegisterInput) => {
        try {
          const { data } = await apolloClient.mutate<
            RegisterMutationData,
            { data: RegisterInput }
          >({
            mutation: REGISTER,
            variables: {
              data: {
                name: registerData.name,
                email: registerData.email,
                password: registerData.password,
              },
            },
          })

          if (data?.register) {
            const { user, token } = data.register

            set({
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
              },
              token,
              isAuthenticated: true,
            })

            return true
          }

          return false
        } catch (error) {
          console.error("Signup error")
          throw error
        }
      },
      login: async (loginData: LoginInput) => {
        try {
          const { data } = await apolloClient.mutate<
            LoginMutationData,
            { data: LoginInput }
          >({
            mutation: LOGIN,
            variables: {
              data: {
                email: loginData.email,
                password: loginData.password,
              },
            },
          })

          if (data?.login) {
            const { user, token } = data.login

            set({
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
              },
              token,
              isAuthenticated: true,
            })

            return true
          }

          return false
        } catch (error) {
          console.error("Login error")
          throw error
        }
      },
    }),
    {
      name: "auth",
    },
  ),
)
