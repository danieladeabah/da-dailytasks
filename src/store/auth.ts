import { defineStore } from 'pinia'

export const useAuthenticationStore = defineStore('authentication', {
  state: () => ({
    token: '',
    error: '',
    success: ''
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
          this.error = data.message || 'Unexpected error'
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
          this.token = data.token
          localStorage.setItem('authToken', this.token)
          this.success = data.message || 'Login successful!'
          navigateTo('/dashboard')
        } else {
          this.error = data.message || 'Unexpected error'
          this.clearErrorAfterDelay()
        }
      } catch (err: any) {
        this.error = this.getErrorMessage(err)
        this.clearErrorAfterDelay()
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
          this.error = data.message || 'Unexpected error'
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
          this.error = data.message || 'Unexpected error'
          this.clearErrorAfterDelay()
        }
      } catch (err: any) {
        this.error = this.getErrorMessage(err)
        this.clearErrorAfterDelay()
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
      localStorage.removeItem('authToken')
      this.error = ''
    },

    loadToken() {
      this.token = localStorage.getItem('authToken') ?? ''
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
