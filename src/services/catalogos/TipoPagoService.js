
class TipoPagoService {
    axios
    baseUrl
    url

    constructor(axios, baseUrl){
        this.axios = axios
        this.baseUrl = `${baseUrl}/api/tipo-pago`
        this.url = baseUrl
    }

    getTipoPago(data)
    {
        return this.axios.get(`${this.baseUrl}?sortBy=${data.sortBy}&sortDesc=${data.sortDesc}&perPage=${data.perPage}&page=${data.page}&search=${data.search}`);
    }

    saveTipoPago(data)
    {
        return this.axios.post(`${this.baseUrl}`, data);
    }
    
    editTipoPago(id)
    {
        return this.axios.get(`${this.baseUrl}/`+id+`/edit`);
    }

    updateTipoPago(data)
    {
        return this.axios.put(`${this.baseUrl}/${data.id}`,data);
    }

    deleteTipoPago(id)
    {
        return this.axios.delete(`${this.baseUrl}/${id}`);
    }

    obtenerTipoPago(id)
    {
        return this.axios.get(`${this.baseUrl}-obtener`);
    }
}

export default TipoPagoService