
class AutorizacionService {
    axios
    baseUrl
    url

    constructor(axios, baseUrl){
        this.axios = axios
        this.baseUrl = `${baseUrl}/api/autorizaciones`
        this.url = baseUrl
    }

    getAutorizacion(data)
    {
        return this.axios.get(`${this.baseUrl}?sortBy=${data.sortBy}&sortDesc=${data.sortDesc}&perPage=${data.perPage}&page=${data.page}&search=${data.search}`);
    }

    saveAutorizacion(data)
    {
        return this.axios.post(`${this.baseUrl}`, data);
    }
    
    editAutorizacion(id)
    {
        return this.axios.get(`${this.baseUrl}/`+id+`/edit`);
    }

    updateAutorizacion(data)
    {
        return this.axios.put(`${this.baseUrl}/${data.id}`,data);
    }

    habilitarAutorizacion(id)
    {
        return this.axios.get(`${this.baseUrl}-habilitar/${id}`);
    }
}

export default AutorizacionService