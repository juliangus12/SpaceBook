import axios from "axios";

const API = axios.create({ baseURL: "https://sbserver-6320da4ec570.herokuapp.com/" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
});

// Fetch a specific user's profile based on their ID
export const getUser = (userId) => API.get(`/user/${userId}`);

// Update a user's profile
export const updateUser = (id, formData) =>  API.put(`/user/${id}`, formData);

// Fetch all users
export const getAllUser = () => API.get('/user');

// Follow a user
export const followUser = (id, data) => API.put(`/user/${id}/follow`, data);

// Unfollow a user
export const unfollowUser = (id, data) => API.put(`/user/${id}/unfollow`, data);
