<template>
  <div class="form-container">
    <h2>Enter Your Details</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label>First Name:</label>
        <input v-model="firstName" data-testid="firstName" required />
      </div>

      <div>
        <label>Last Name:</label>
        <input v-model="lastName" data-testid="lastName" required />
      </div>

      <div>
        <label>Phone Number:</label>
        <input v-model="phone" type="tel" data-testid="phone" required />
      </div>

      <button type="submit">Submit</button>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const router = useRouter()
const userStore = useUserStore()

const firstName = ref('')
const lastName = ref('')
const phone = ref('')
const errorMessage = ref('')

async function submitForm() {
  errorMessage.value = ''

  try {
    const response = await fetch('http://localhost:5090/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: firstName.value,
        lastName: lastName.value,
        phone: phone.value
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong')
    }

    userStore.setUser(data.user)
    router.push({ name: 'Display' })
  } catch (err) {
    errorMessage.value = err.message
  }
}
</script>

<style scoped>
.form-container {
  max-width: 400px;
  margin: auto;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

form div {
  margin-bottom: 12px;
}

button {
  background: #007bff;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}

.error {
  color: red;
  margin-top: 8px;
}
</style>
