import axios from 'axios'

const ax = axios.create({
  baseURL: 'http://localhost:3000'
})

const authOptions = token => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export const fetchProducts = () => ax.get('/products')
export const registerUser = payload => ax.post('/auth/register', payload)
export const loginUser = payload => ax.post('/auth/login', payload)
export const createProduct = (user, token, payload) => {
  let formData = new FormData()
  for (let key in payload) {
    formData.append(key, payload[key])
  }
  return ax
    .post(`/users/${user._id}/products`, formData, authOptions(token))
}
export const deleteProduct = (user, token, payload) => {
  return ax
    .delete(`/users/${user._id}/products/${payload}`, authOptions(token))
}
export const editProduct = (user, token, payload) => {
  let formData = new FormData()
  for (let key in payload) {
    formData.append(key, payload[key])
  }
  return ax
    .put(`/users/${user._id}/products/${payload._id}`, formData, authOptions(token))
}
export const addProduct = (user, token, payload) => {
  return ax
    .post(`/users/${user._id}/cart`, payload, authOptions(token))
}
export const fetchCart = (user, token) => {
  return ax
    .get(`/users/${user._id}/cart`, authOptions(token))
}
export const removeProduct = (user, token, payload) => {
  return ax
    .delete(`/users/${user._id}/cart/${payload}`, authOptions(token))
}
export const clearCart = (user, token) => {
  return ax
    .delete(`/users/${user._id}/cart`, authOptions(token))
}