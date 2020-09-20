
class ServicioService {
    axios
    baseUrl
    url

    constructor(axios, baseUrl){
        this.axios = axios
        this.baseUrl = `${baseUrl}/api/servicios`
        this.url = baseUrl
    }

    getServicio(data)
    {
        return this.axios.get(`${this.baseUrl}?sortBy=${data.sortBy}&sortDesc=${data.sortDesc}&perPage=${data.perPage}&page=${data.page}&search=${data.search}`);
    }

    detailServicio(id)
    {
        return this.axios.get(`${this.baseUrl}-detalle/` + id);
    }
}

export default ServicioService