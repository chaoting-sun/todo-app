import axios from "axios";
const baseURL = "/api/todos";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((res) => res.data);
};

const create = (todo) => {
  const request = axios.post(baseURL, todo);
  return request.then((res) => res.data);
};

const update = (id, partOfTodo) => {
  const request = axios.patch(`${baseURL}/${id}`, partOfTodo);
  return request.then((res) => res.data);
};

const remove = (id) => {
  const request = axios.delete(`${baseURL}/${id}`);
  return request;
};

const removeCompleted = (idsToDelete) => {
  const deleteRequests = idsToDelete.map((id) =>
    axios.delete(`${baseURL}/${id}`)
  );
  return Promise.all(deleteRequests);
};

export default { getAll, create, update, remove, removeCompleted };
