import { useAuthStore } from '@/stores/auth'

export async function exampleAuthFlow() {
  const authStore = useAuthStore()

  await authStore.login({ email: 'admin@example.com', password: 'password' })
  await authStore.fetchUsers()
  await authStore.createUser({ name: 'New User', email: 'new@example.com', role: 'user' })
  await authStore.updateUser(1, {
    name: 'Updated User',
    email: 'updated@example.com',
    role: 'admin',
  })
  await authStore.deleteUser(1)
}
