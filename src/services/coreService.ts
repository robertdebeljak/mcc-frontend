import axios from "axios";

const SERVER_URL = "http://localhost:8000";

export async function getCodeList(params) {
  const res = await axios.get(`${SERVER_URL}/api?limit=${params.limit}&offset=${params.offset}&search=${params.search}&sortBy=${params.sortBy}&sortOrder=${params.sortOrder}`);
  return res.data;
}
