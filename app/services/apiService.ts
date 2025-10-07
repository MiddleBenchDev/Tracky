import axios from "axios"

class apiService {
    get(url: string) {
       return axios.get(url)
    }

    post (url:string, payload: Record<string, any>) {
        return axios.post(url, payload)
    }
}

const ApiService = new apiService()
export default ApiService