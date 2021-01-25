import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getBlog = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.post(baseUrl, newObject, config);
  return res.data;
};

const update = async (id, newObject) => {
  const res = await axios.put(`${baseUrl}/${id}`, newObject);
  return res.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.delete(`${baseUrl}/${id}`, config);
  return res.data;
};

const comment = async (id, newComment) => {
  const res = await axios.post(`${baseUrl}/${id}/comments`, newComment);
  return res.data;
};

export default { getAll, create, setToken, update, remove, comment, getBlog };
