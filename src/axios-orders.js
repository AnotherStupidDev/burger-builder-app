import axios from "axios"

const instance = axios.create({
  baseURL: "https://react-burger-app-550b7.firebaseio.com/",
})

export default instance
