import axios from 'axios'


const API = axios.create({ baseURL: 'https://sbserver-6320da4ec570.herokuapp.com/' });

export const logIn= (formData)=> API.post('/auth/login',formData);

export const signUp = (formData) => API.post('/auth/register', formData);
