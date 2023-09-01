import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const getTimelinePosts= (id)=> API.get(`/posts/${id}/timeline`);
export const likePost=(id, userId)=>API.put(`posts/${id}/like`, {userId: userId})
export const addComment = (postId, commentData) => {
  return axios.post(`/posts/${postId}/comments`, commentData);
};
export const deleteComment = (postId, commentId) => {
  return axios.delete(`/posts/${postId}/comments/${commentId}`);
};
export const editComment = (postId, commentId, updatedText) => {
  return axios.put(`/posts/${postId}/comments/${commentId}`, { text: updatedText });
};