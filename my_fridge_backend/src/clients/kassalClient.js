import axios from 'axios';

export default (kassalClientApiKey) => axios.create({
  baseURL: 'https://kassal.app',
  timeout: 30000,
  headers: { Authorization: `Bearer ${kassalClientApiKey}` }
});