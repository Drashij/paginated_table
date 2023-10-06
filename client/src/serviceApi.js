import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:3000/`,
});
export default {
  getEmployees: function (page, sortString,search) {
    console.log("sortString", sortString);
    return api.get(`/?sortBy=${sortString}&page=${page}&search=${search}`);
  },
  // filterData: function (page, search, sortBy) {
  //   return api.get(`/filter?search=${search}&page=${page}&sort=${sortBy}`);
  // },
};
