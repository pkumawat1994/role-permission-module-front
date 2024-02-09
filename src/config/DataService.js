import axios from "axios";

export const dataService=axios.create({
    baseURL:"http://localhost:3050/api/"
});