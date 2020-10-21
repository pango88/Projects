import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const createNew = async (content) => {
  const object = { content, votes: 0 };
  const res = await axios.post(baseUrl, object);
  return res.data;
};

const addVote = async (id, obj) => {
  const res = axios.put(`${baseUrl}/${id}`, obj);
  return res.data;
};

export default { getAll, createNew, addVote };
