import api from './axios'

export const userApi = {
    get: () => api.get(`/users/getUser`),
}
export const profileApi = {
    // get: () => api.get('/profile'),
    // update: (payload) => api.put('/profile', payload),
    // uploadAvatar: (formData) =>
    //     api.post('/profile/avatar', formData, {
    //         headers: { 'Content-Type': 'multipart/form-data' },
    //     }),
};