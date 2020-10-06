
class MiServicioService {
    axios
    baseUrl
    url

    constructor(axios, baseUrl){
        this.axios = axios
        this.baseUrl = `${baseUrl}/api/mis-servicios`
        this.url = baseUrl
    }

    getMisServicios(data)
    {
        return this.axios.get(`${this.baseUrl}?sortBy=${data.sortBy}&sortDesc=${data.sortDesc}&perPage=${data.perPage}&page=${data.page}&search=${data.search}`);
    }

    detailMisServicios(data)
    {
        return this.axios.get(`${this.baseUrl}-detalle?sortBy=${data.sortBy}&sortDesc=${data.sortDesc}&perPage=${data.perPage}&page=${data.page}&search=${data.search}&servicio=${data.servicio}`);
    }
}

export default MiServicioService