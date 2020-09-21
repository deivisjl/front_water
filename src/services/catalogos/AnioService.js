
class AnioService {
    axios
    baseUrl
    url

    constructor(axios, baseUrl){
        this.axios = axios
        this.baseUrl = `${baseUrl}/api/anios`
        this.url = baseUrl
    }

    getAnios()
    {
        return this.axios.get(`${this.baseUrl}`);
    }
}

export default AnioService