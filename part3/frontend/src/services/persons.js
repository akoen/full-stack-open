import axios from 'axios';
const baseUrl = '/api/persons';

const getPersons = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const addPerson = (personObject) => {
  return axios.post(baseUrl, personObject).then((response) => response.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

const replaceNumber = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then((response) => response.data);
};

export default { getPersons, addPerson, deletePerson, replaceNumber };
