
class PagoService {
    axios
    baseUrl
    url

    constructor(axios, baseUrl){
        this.axios = axios
        this.baseUrl = `${baseUrl}/api/pagos`
        this.url = baseUrl
    }

    savePago(data)
    {
        return this.axios.post(`${this.baseUrl}`, data)
    }

    detailServicio(id)
    {
        return this.axios.get(`${this.baseUrl}-detalle/` + id);
    }

    obtenerServicios(id)
    {
        return this.axios.get(`${this.baseUrl}-usuario/` + id);
    }
}

export default PagoService