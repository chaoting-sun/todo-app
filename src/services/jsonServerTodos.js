import axios from "axios";
const baseURL = "http://localhost:3001/todos";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((res) => res.data);
};

const create = (todo) => {
  const request = axios.post(baseURL, todo);
  return request.then((res) => res.data);
};

const update = (id, todo) => {
  const request = axios.put(`${baseURL}/${id}`, todo);
  return request;
};

const remove = (id) => {
  const request = axios.delete(`${baseURL}/${id}`);
  return request.then((res) => res.data);
};

const toggle = (id, todoPart) => {
  const request = axios.patch(`${baseURL}/${id}`, todoPart);
  return request.then((res) => res.data);
};

const removeCompleted = (idsToDelete) => {
  const deleteRequests = idsToDelete.map((id) =>
    axios.delete(`${baseURL}/${id}`)
  );
  return Promise.all(deleteRequests);
};

export default { getAll, create, update, remove, toggle, removeCompleted };
