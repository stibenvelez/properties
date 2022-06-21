import axios from "axios";

const token = localStorage.getItem("token");
if (!token) {
    console.log("no hay token");
}
const config = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
};

const clientAxios = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
});

export default clientAxios;
