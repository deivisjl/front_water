
class EstadoServicioService {
    axios
    baseUrl
    url

    constructor(axios, baseUrl){
        this.axios = axios
        this.baseUrl = `${baseUrl}/api/estado-servicio`
        this.url = baseUrl
    }

    getEstadoServicio(data)
    {
        return this.axios.get(`${this.baseUrl}?sortBy=${data.sortBy}&sortDesc=${data.sortDesc}&perPage=${data.perPage}&page=${data.page}&search=${data.search}`);
    }

    saveEstadoServicio(data)
    {
        return this.axios.post(`${this.baseUrl}`, data);
    }
    
    editEstadoServicio(id)
    {
        return this.axios.get(`${this.baseUrl}/`+id+`/edit`);
    }

    updateEstadoServicio(data)
    {
        return this.axios.put(`${this.baseUrl}/${data.id}`,data);
    }

    deleteEstadoServicio(id)
    {
        return this.axios.delete(`${this.baseUrl}/${id}`);
    }
}

export default EstadoServicioService