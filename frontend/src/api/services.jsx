import api from './axios'

export const userApi = {
    get: () => api.get(`/users/getUser`),
    login: (credentials) => api.post(`/users/login`, credentials),
    logout: () => api.post(`/users/logout`),
    refreshToken: () => api.post(`/users/refresh-token`),
    getStats: () => api.get(`/users/stats`),
    getAllUsers: () => api.get(`/users/all`),
}
export const profileApi = {
    uploadAvatar: (formData) =>
        api.post('/profile/avatar', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }),
};