class HomeService {
    axios
    baseUrl

    constructor(axios, baseUrl){
        this.axios = axios
        this.baseUrl = `${baseUrl}`
    }

    me(){
        return this.axios.get(`${this.baseUrl}/api/books`);
    }


}

export default HomeService