import { defineStore } from "pinia";

export const useAuthenticationStore = defineStore("authentication", {
  state: () => ({
    token: "",
  }),
  actions: {
    async signup(
      email: string,
      password: string,
      first_name: string,
      last_name: string
    ) {
      try {
        const data = await $fetch("/api/auth/signup", {
          method: "POST",
          body: { first_name, last_name, email, password },
        });

        if (data.statusCode === 201) {
          console.log("Signup successful! Redirecting to login...");
          navigateTo("/authentication/login");
        }
      } catch (err: any) {
        if (err.statusCode === 409) {
          console.log("Email is already in use");
        } else if (err.statusCode === 400) {
          console.log("All fields are required");
        } else {
          console.error("Error during signup: " + err.message);
        }
      }
    },

    async login(email: string, password: string) {
      try {
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
          console.log("Login successful!");
        }
      } catch (err: any) {
        if (err.statusCode === 401) {
          console.log("Invalid credentials");
        } else if (err.statusCode === 404) {
          console.log("User not found");
        } else if (err.statusCode === 500) {
          console.log("Server error");
        } else {
          console.error("Error during login: " + err.message);
        }
      }
    },

    logout() {
      this.token = "";
      localStorage.removeItem("authToken");
    },

    loadToken() {
      this.token = localStorage.getItem("authToken") ?? "";
    },
  },
});
