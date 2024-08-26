import { defineStore } from "pinia";

export const useAuthenticationStore = defineStore("authentication", {
  state: () => ({
    token: "",
    error: "",
  }),
  actions: {
    async signup(
      email: string,
      password: string,
      first_name: string,
      last_name: string
    ) {
      try {
        this.error = "";
        const data = await $fetch("/api/auth/signup", {
          method: "POST",
          body: { first_name, last_name, email, password },
        });

        if (data.statusCode === 201) {
          console.log("Signup successful! Redirecting to login...");
          navigateTo("/authentication/login");
        } else {
          this.error = data.message || "Unexpected error";
          this.clearErrorAfterDelay();
        }
      } catch (err: any) {
        if (err.statusCode === 409) {
          this.error = "Email is already in use";
        } else if (err.statusCode === 400) {
          this.error = "All fields are required";
        } else {
          this.error = "Error during signup: " + err.message;
        }
        this.clearErrorAfterDelay();
      }
    },

    async login(email: string, password: string) {
      try {
        this.error = "";
        const data = await $fetch("/api/auth/login", {
          method: "POST",
          body: { email, password },
        });

        if (data.statusCode === 200) {
          this.token = data.token;
          localStorage.setItem("authToken", this.token);
          console.log("Login successful! Redirecting to home...");
          navigateTo("/");
        } else {
          this.error = data.message || "Unexpected error";
          this.clearErrorAfterDelay();
        }
      } catch (err: any) {
        if (err.statusCode === 401) {
          this.error = err.message || "Invalid credentials";
        } else if (err.statusCode === 404) {
          this.error = "User not found";
        } else if (err.statusCode === 500) {
          this.error = "Server error";
        } else {
          this.error = "Error during login: " + err.message;
        }
        this.clearErrorAfterDelay();
      }
    },

    logout() {
      this.token = "";
      localStorage.removeItem("authToken");
      this.error = "";
    },

    loadToken() {
      this.token = localStorage.getItem("authToken") ?? "";
    },

    clearErrorAfterDelay() {
      setTimeout(() => {
        this.error = "";
      }, 2000);
    },
  },
});

