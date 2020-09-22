
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

    detailServicio(data)
    {
        return this.axios.get(`${this.baseUrl}-detalle?sortBy=${data.sortBy}&sortDesc=${data.sortDesc}&perPage=${data.perPage}&page=${data.page}&search=${data.search}&pago=${data.pago}`);
    }

    obtenerServicios(id)
    {
        return this.axios.get(`${this.baseUrl}-usuario/` + id);
    }
}

export default PagoService