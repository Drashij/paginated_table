import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:3000/`,
});
export default {
  getEmployees: function (page, sortBy) {
    return api.get(`/?sortBy=${sortBy}&page=${page}`);
  },
  filterData: function (search) {
    return api.get(`/filter?search=${search}`);
  },
};
