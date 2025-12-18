
import { createRouter, createWebHistory } from 'vue-router'
import FormComponent from '../components/FormComponent.vue'
import DisplayComponent from '../components/DisplayComponent.vue'

const routes = [
  { path: '/', name: 'Form', component: FormComponent },
  { path: '/display', name: 'Display', component: DisplayComponent }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
