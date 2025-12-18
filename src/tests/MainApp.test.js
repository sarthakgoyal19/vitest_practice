import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import waitForExpect from 'wait-for-expect'
import { createPinia, setActivePinia } from 'pinia'
import router from '../router'
import App from '../App.vue'

async function mountApp() {
  const pinia = createPinia()
  setActivePinia(pinia)

  const wrapper = mount(App, {
    global: {
      plugins: [pinia, router]
    }
  })

  await router.isReady()
  return { wrapper, router }
}

describe('Full App Flow with REAL Backend', () => {
  let wrapper, routerInstance

  beforeEach(async () => {
    const app = await mountApp()
    wrapper = app.wrapper
    routerInstance = app.router
  })

  it('navigates to /display after submitting valid data and returns to / when Back clicked', async () => {
    expect(routerInstance.currentRoute.value.path).toBe('/')

    await wrapper.find('[data-testid="firstName"]').setValue('Johnathan')
    await wrapper.find('[data-testid="lastName"]').setValue('Doe')
    await wrapper.find('[data-testid="phone"]').setValue('9876543210')

    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    await waitForExpect(() => {
      expect(routerInstance.currentRoute.value.path).toBe('/display')
    })

    await wrapper.find('[data-testid="backToForm"]').trigger('click')
    await flushPromises()

    await waitForExpect(() => {
      expect(routerInstance.currentRoute.value.path).toBe('/')
    })
  })

  it('stays on / and shows error when submitting invalid data (empty fields)', async () => {
    expect(routerInstance.currentRoute.value.path).toBe('/')

    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    await waitForExpect(() => {
      const error = wrapper.find('.error')
      expect(error.exists()).toBe(true)
      expect(error.text()).toBe('All fields are required.')
      expect(routerInstance.currentRoute.value.path).toBe('/')
    })
  })

  it('stays on / and shows error when full name < 8 characters', async () => {
    expect(routerInstance.currentRoute.value.path).toBe('/')

    await wrapper.find('[data-testid="firstName"]').setValue('Jo')
    await wrapper.find('[data-testid="lastName"]').setValue('Li')
    await wrapper.find('[data-testid="phone"]').setValue('9876543210')

    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()
  
    await waitForExpect(() => {
      const error = wrapper.find('.error')
      expect(error.exists()).toBe(true)
      expect(error.text()).toBe('Full name must have at least 8 characters.')
      expect(routerInstance.currentRoute.value.path).toBe('/')
    })
  })

  it('stays on / and shows error when phone is invalid', async () => {
    expect(routerInstance.currentRoute.value.path).toBe('/')

    await wrapper.find('[data-testid="firstName"]').setValue('Johnathan')
    await wrapper.find('[data-testid="lastName"]').setValue('Doe')
    await wrapper.find('[data-testid="phone"]').setValue('12345')

    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    await waitForExpect(() => {
      const error = wrapper.find('.error')
      expect(error.exists()).toBe(true)
      expect(error.text()).toBe('Phone number must be 10 digits.')
      expect(routerInstance.currentRoute.value.path).toBe('/')
    })
  })
})
