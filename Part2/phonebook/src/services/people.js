import Axios from "axios"
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = Axios.get(baseUrl)
  return request.then(response => response.data)
}

const addNew = (name) => {
  const request = Axios.post(baseUrl, name)
  return request.then(response => response.data)
}

const deleteEntry = (id) => {
  const request = Axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const updateNumber = (id, newEntry) => {
  const request = Axios.put(`${baseUrl}/${id}`, newEntry)
  return request.then(response => response.data)
}

export default {getAll, addNew, deleteEntry, updateNumber}