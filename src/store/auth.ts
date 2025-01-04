import { defineStore } from 'pinia'

const API_PATHS = {
  signup: '/api/auth/signup',
  login: '/api/auth/login',
  getUserDetails: '/api/auth/get-user-details',
  forgotPassword: '/api/auth/forgot-password',
  newPassword: '/api/auth/new-password',
  updateEmail: '/api/auth/update-email',
  updateProfileImage: '/api/auth/update-profile-image',
  updateFirstName: '/api/auth/update-first-name',
  updateLastName: '/api/auth/update-last-name',
  deleteUser: '/api/auth/delete-user',
  getAllUsers: '/api/auth/get-all-users'
}

const STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  CONFLICT: 409
}

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
    },
    users: [] as Array<{
      id: number
      first_name: string
      last_name: string
      profile_image: string
      email: string
      created_at: string
      updated_at: string
    }>
  }),

  actions: {
    async signup(
      email: string,
      password: string,
      first_name: string,
      last_name: string
    ) {
      await this.authenticateUser(
        API_PATHS.signup,
        { first_name, last_name, email, password },
        STATUS_CODES.CREATED,
        'Signup successful! You can now login',
        '/auth/login'
      )
    },

    async login(email: string, password: string) {
      await this.authenticateUser(
        API_PATHS.login,
        { email, password },
        STATUS_CODES.SUCCESS,
        'Login successful!',
        '/dashboard'
      )
    },

    async authenticateUser(
      apiPath: string,
      body: object,
      successCode: number,
      successMessage: string,
      redirectPath: string
    ) {
      try {
        this.error = ''
        const data = await $fetch<{ statusCode: number; token?: string }>(
          apiPath,
          {
            method: 'POST',
            body
          }
        )

        if (data.statusCode === successCode) {
          if ('token' in data && data.token) {
            this.token = data.token
            localStorage.setItem('authToken', this.token)
          }
          this.success = successMessage
          navigateTo(redirectPath)
        } else {
          this.handleError(data)
        }
      } catch (err: any) {
        this.handleError(err)
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
        }>(API_PATHS.getUserDetails, {
          method: 'GET',
          headers: { Authorization: `Bearer ${this.token}` }
        })

        if (data.statusCode === STATUS_CODES.SUCCESS) {
          this.user = {
            id: data.id ?? null,
            first_name: data.first_name ?? '',
            last_name: data.last_name ?? '',
            email: data.email ?? '',
            profile_image: data.profile_image ?? ''
          }
        } else {
          this.handleError(data)
        }
      } catch (err) {
        this.handleError(err)
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

    async getAllUsers() {
      try {
        const data = await $fetch<{
          statusCode: number
          users?: Array<{
            id: number
            first_name: string
            last_name: string
            profile_image: string
            email: string
            created_at: string
            updated_at: string
          }>
          message?: string
        }>(API_PATHS.getAllUsers, {
          method: 'GET',
          headers: { Authorization: `Bearer ${this.token}` }
        })

        if (data.statusCode === STATUS_CODES.SUCCESS && data.users) {
          this.users = data.users
        } else {
          this.handleError(data)
        }
      } catch (err: any) {
        this.handleError(err)
      }
    },

    async forgotPassword(email: string) {
      await this.authenticateUser(
        API_PATHS.forgotPassword,
        { email },
        STATUS_CODES.SUCCESS,
        'Email sent successfully. Please check your inbox.',
        '/auth/mailinfo'
      )
    },

    async newPassword(password: string, confirmPassword: string) {
      if (password !== confirmPassword) {
        this.error = 'Passwords do not match'
        this.clearErrorAfterDelay()
        return
      }
      try {
        const data = await $fetch<{ statusCode: number }>(
          API_PATHS.newPassword,
          {
            method: 'POST',
            body: { password, token: location.pathname.split('/').pop() }
          }
        )

        if (data.statusCode === STATUS_CODES.SUCCESS) {
          this.success = 'Password changed successfully!'
          navigateTo('/auth/login')
        } else if (data.statusCode === STATUS_CODES.BAD_REQUEST) {
          this.error = 'Invalid or expired token.'
          this.clearErrorAfterDelay()
        } else {
          this.handleError(data)
        }
      } catch (err) {
        this.handleError(err)
      }
    },

    async updateEmail(newEmail: string) {
      await this.updateUserData(
        API_PATHS.updateEmail,
        { email: newEmail },
        'Email updated successfully!',
        'email',
        newEmail
      )
    },

    async updateProfileImage(formData: FormData) {
      await this.updateUserData(
        API_PATHS.updateProfileImage,
        formData,
        'Profile image updated successfully!',
        'profile_image',
        ''
      )
    },

    async updateFirstName(firstName: string) {
      await this.updateUserData(
        API_PATHS.updateFirstName,
        { first_name: firstName },
        'First name updated successfully!',
        'first_name',
        firstName
      )
    },

    async updateLastName(lastName: string) {
      await this.updateUserData(
        API_PATHS.updateLastName,
        { last_name: lastName },
        'Last name updated successfully!',
        'last_name',
        lastName
      )
    },

    async updateUserData(
      apiPath: string,
      body: object,
      successMessage: string,
      field: 'first_name' | 'last_name' | 'email' | 'profile_image',
      value: string
    ) {
      try {
        const response = await $fetch<{ statusCode: number; message?: string }>(
          apiPath,
          {
            method: 'POST',
            body,
            headers: { Authorization: `Bearer ${this.token}` }
          }
        )

        if (response.statusCode === STATUS_CODES.SUCCESS) {
          this.user[field] = value
          this.success = successMessage
        } else {
          this.handleError(response)
        }
      } catch (err: any) {
        this.handleError(err)
      }
    },

    async deleteUser() {
      try {
        const response = await $fetch<{ statusCode: number; message?: string }>(
          API_PATHS.deleteUser,
          {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${this.token}` }
          }
        )

        if (response.statusCode === STATUS_CODES.SUCCESS) {
          this.success = 'Account deleted successfully.'
          this.logout()
          navigateTo('/')
        } else {
          this.handleError(response)
        }
      } catch (err: any) {
        this.handleError(err)
      }
    },

    handleError(err: any) {
      this.error = this.getErrorMessage(err)
      this.clearErrorAfterDelay()
    },

    getErrorMessage(err: any): string {
      if (err.statusCode === STATUS_CODES.CONFLICT)
        return 'Email is already in use'
      if (err.statusCode === STATUS_CODES.BAD_REQUEST)
        return 'All fields are required'
      if (err.statusCode === STATUS_CODES.UNAUTHORIZED)
        return err.message || 'Invalid credentials'
      if (err.statusCode === STATUS_CODES.NOT_FOUND) return 'User not found'
      if (err.statusCode === STATUS_CODES.SERVER_ERROR) return 'Server error'
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
