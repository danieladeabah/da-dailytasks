import { defineStore } from 'pinia'

export const useAuthenticationStore = defineStore('authentication', {
  state: () => ({
    token: '',
    error: '',
    success: '',
    user: {
      id: null as number | null,
      first_name: '',
      last_name: '',
      email: '',
      profile_image: ''
    }
  }),
  actions: {
    async signup(
      email: string,
      password: string,
      first_name: string,
      last_name: string
    ) {
      try {
        this.error = ''
        const data = await $fetch('/api/auth/signup', {
          method: 'POST',
          body: { first_name, last_name, email, password }
        })

        if (data.statusCode === 201) {
          this.success = data.message || 'Signup successful! You can now login'
          navigateTo('/auth/login')
        } else {
          this.error = data.message ?? 'Unexpected error'
          this.clearErrorAfterDelay()
        }
      } catch (err: any) {
        this.error = this.getErrorMessage(err)
        this.clearErrorAfterDelay()
      }
    },

    async login(email: string, password: string) {
      try {
        this.error = ''
        const data = await $fetch('/api/auth/login', {
          method: 'POST',
          body: { email, password }
        })

        if (data.statusCode === 200) {
          if ('token' in data && data.token) {
            this.token = data.token as string
          }
          localStorage.setItem('authToken', this.token)
          this.success = data.message || 'Login successful!'
          navigateTo('/dashboard')
        } else {
          this.error = data.message ?? 'Unexpected error'
          this.clearErrorAfterDelay()
        }
      } catch (err: any) {
        this.error = this.getErrorMessage(err)
        this.clearErrorAfterDelay()
      }
    },

    async fetchUserDetails() {
      try {
        const data = await $fetch<{
          statusCode: number
          id?: number
          first_name?: string
          last_name?: string
          email?: string
          profile_image?: string
          message?: string
        }>('/api/auth/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })

        if (data.statusCode === 200) {
          this.user = {
            id: data.id ?? null,
            first_name: data.first_name ?? '',
            last_name: data.last_name ?? '',
            email: data.email ?? '',
            profile_image: data.profile_image ?? ''
          }
        } else {
          this.error = data.message ?? 'Unable to fetch user details'
          this.clearErrorAfterDelay()
        }
      } catch (err) {
        this.error = this.getErrorMessage(err)
        this.clearErrorAfterDelay()
      }
    },

    getUserInfo() {
      return {
        id: this.user.id,
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
        profile_image: this.user.profile_image
      }
    },

    async forgotPassword(email: string) {
      try {
        this.error = ''
        const data = await $fetch('/api/auth/forgot-password', {
          method: 'POST',
          body: { email }
        })

        if (data.statusCode === 200) {
          this.success =
            data.message || 'Email sent successfully. Please check your inbox.'
          navigateTo('/auth/mailinfo')
          this.clearSuccessAfterDelay()
        } else {
          this.error = data.message ?? 'Unexpected error'
          this.clearErrorAfterDelay()
        }
      } catch (err: any) {
        this.error = this.getErrorMessage(err)
        this.clearErrorAfterDelay()
      }
    },

    async newPassword(password: string, confirmPassword: string) {
      try {
        if (password !== confirmPassword) {
          this.error = 'Passwords do not match'
          this.clearErrorAfterDelay()
          return
        }

        this.error = ''
        const data = await $fetch('/api/auth/new-password', {
          method: 'POST',
          body: { password, token: this.token }
        })

        if (data.statusCode === 200) {
          this.success =
            data.message || 'Password changed successfully. You can now log in.'
          navigateTo('/auth/login')
          this.clearSuccessAfterDelay()
        } else {
          this.error = data.message ?? 'Unexpected error'
          this.clearErrorAfterDelay()
        }
      } catch (err: any) {
        this.error = this.getErrorMessage(err)
        this.clearErrorAfterDelay()
      }
    },

    async updateEmail(newEmail: string) {
      try {
        this.error = ''
        const data = await $fetch('/api/auth/update-email', {
          method: 'POST',
          body: { email: newEmail },
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })

        if (data.statusCode === 200) {
          this.success = data.message || 'Email updated successfully!'
          this.user.email = newEmail
        } else {
          this.error = data.message ?? 'Unexpected error'
          this.clearErrorAfterDelay()
        }
      } catch (err: any) {
        this.error = this.getErrorMessage(err)
        this.clearErrorAfterDelay()
      }
    },

    async updateProfileImage(formData: FormData) {
      try {
        const data = await $fetch<{ statusCode: number; message?: string }>(
          '/api/auth/update-profile-image',
          {
            method: 'POST',
            body: formData,
            headers: {
              Authorization: `Bearer ${this.token}`
            }
          }
        )

        if (data.statusCode === 200) {
          this.success = 'Profile image updated successfully!'
        } else {
          this.error = data.message ?? 'Unexpected error'
          this.clearErrorAfterDelay()
        }
      } catch (err: any) {
        this.error = this.getErrorMessage(err)
        this.clearErrorAfterDelay()
      }
    },

    async updateFirstName(firstName: string) {
      try {
        const response = await $fetch<{ statusCode: number; message?: string }>(
          '/api/auth/update-first-name',
          {
            method: 'POST',
            body: { first_name: firstName },
            headers: {
              Authorization: `Bearer ${this.token}`
            }
          }
        )

        if (response.statusCode === 200) {
          this.user.first_name = firstName
          this.success = 'First name updated successfully!'
        } else {
          this.error =
            response.message ?? 'Unexpected error updating first name'
        }
      } catch (err: any) {
        this.error = 'Error updating first name'
        console.error(err)
      }
    },

    async updateLastName(lastName: string) {
      try {
        const response = await $fetch<{ statusCode: number; message?: string }>(
          '/api/auth/update-last-name',
          {
            method: 'POST',
            body: { last_name: lastName },
            headers: {
              Authorization: `Bearer ${this.token}`
            }
          }
        )

        if (response.statusCode === 200) {
          this.user.last_name = lastName
          this.success = 'Last name updated successfully!'
        } else {
          this.error = response.message ?? 'Unexpected error updating last name'
        }
      } catch (err: any) {
        this.error = 'Error updating last name'
        console.error(err)
      }
    },

    getErrorMessage(err: any): string {
      if (err.statusCode === 409) return 'Email is already in use'
      if (err.statusCode === 400) return 'All fields are required'
      if (err.statusCode === 401) return err.message || 'Invalid credentials'
      if (err.statusCode === 404) return 'User not found'
      if (err.statusCode === 500) return 'Server error'
      return 'Error: ' + err.message
    },

    logout() {
      this.token = ''
      this.user = {
        id: null,
        first_name: '',
        last_name: '',
        email: '',
        profile_image: ''
      }
      localStorage.removeItem('authToken')
      this.error = ''
    },

    loadToken() {
      if (import.meta.client) {
        this.token = localStorage.getItem('authToken') ?? ''
      }
    },
    saveToken(token: string) {
      if (import.meta.client) {
        this.token = token
        localStorage.setItem('authToken', token)
      }
    },

    clearErrorAfterDelay() {
      setTimeout(() => {
        this.error = ''
      }, 2000)
    },

    clearSuccessAfterDelay() {
      setTimeout(() => {
        this.success = ''
      }, 2000)
    }
  }
})
