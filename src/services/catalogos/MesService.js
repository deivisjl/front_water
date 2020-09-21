
class MesService {
    axios
    baseUrl
    url

    constructor(axios, baseUrl){
        this.axios = axios
        this.baseUrl = `${baseUrl}/api/meses`
        this.url = baseUrl
    }

    getMeses()
    {
        return this.axios.get(`${this.baseUrl}`);
    }
}

export default MesService