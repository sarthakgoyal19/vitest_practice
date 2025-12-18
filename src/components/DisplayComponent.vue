<!-- src/components/DisplayComponent.vue -->
<template>
  <div class="display-container" v-if="user">
    <h2>User Details</h2>
    <p data-testid="fullName"><strong>Full Name:</strong> {{ fullName }}</p>
    <p data-testid="phone"><strong>Phone:</strong> {{ user.phone }}</p>

    <router-link to="/">
      <button data-testid="backToForm" @click="userStore.clearUser()">Back to Form</button>
    </router-link>
  </div>

  <p v-else>No user data found. Please go back and submit the form.</p>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()
const user = computed(() => userStore.user)

const fullName = computed(() =>
  user.value ? `${user.value.firstName} ${user.value.lastName}` : ''
)
</script>

<style scoped>
.display-container {
  max-width: 400px;
  margin: auto;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
button {
  margin-top: 10px;
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background: #0056b3;
}
</style>
