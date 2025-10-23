<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const router = useRouter();
const toast = useToast();

const mode = ref("login");
const email = ref("");
const password = ref("");
const loading = ref(false);

const submitForm = async () => {
  if (mode.value === "register") {
    toast.info("Registration must be completed by an administrator.");
    return;
  }

  const endpoint = `${import.meta.env.VITE_FYBRS_API_URL}/auth/login`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.value, password: password.value }),
      credentials: "include",
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Login failed");

    localStorage.setItem("auth_token", result.token);
    toast.success("Login successful!");
    router.push("/");
  } catch (err) {
    toast.error(err.message);
  }
};
</script>

<template>
  <div class="page">
    <div class="auth-card">
      <img
        src="@/assets/images/FybrsLogo.png"
        alt="Fybrs Logo"
        class="logo"
        width="200"
      />

      <div class="tabs">
        <button :class="{ active: mode === 'login' }" @click="mode = 'login'">
          Login
        </button>
        <button
          :class="{ active: mode === 'register' }"
          @click="mode = 'register'"
        >
          Register
        </button>
      </div>

      <form @submit.prevent="submitForm">
        <h2>{{ mode === "login" ? "Sign In" : "Create Account" }}</h2>

        <label>Email</label>
        <input
          v-model="email"
          type="email"
          placeholder="you@email.com"
          required
        />

        <label>Password</label>
        <input
          v-model="password"
          type="password"
          placeholder="••••••••"
          required
        />

        <button :disabled="loading" type="submit">
          {{
            loading ? "Please wait..." : mode === "login" ? "Login" : "Register"
          }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f4f4f4;
}

.auth-card {
  background: #fff;
  border-radius: 12px;
  width: 380px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  text-align: center;
}

.logo {
  margin-bottom: 1rem;
  user-select: none;
}

.tabs {
  display: flex;
  border-bottom: 2px solid #eee;
  margin-bottom: 1.5rem;
}

.tabs button {
  flex: 1;
  padding: 0.75rem 0;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  color: #777;
  cursor: pointer;
  transition: color 0.2s, border 0.2s;
}

.tabs button.active {
  color: #333;
  border-bottom: 2px solid #333;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  font-size: 0.9rem;
  color: #666;
  text-align: left;
}

input {
  padding: 0.6rem 0.8rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}

input:focus {
  border-color: #333;
  outline: none;
}

button {
  background: #333;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.7rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover:not(:disabled) {
  background: #000;
}

button:disabled {
  background: #aaa;
  cursor: not-allowed;
}
</style>
