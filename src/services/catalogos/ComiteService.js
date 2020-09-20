
class ComiteService {
    axios
    baseUrl
    url

    constructor(axios, baseUrl){
        this.axios = axios
        this.baseUrl = `${baseUrl}/api/comite`
        this.url = baseUrl
    }

    getComite(data)
    {
        return this.axios.get(`${this.baseUrl}?sortBy=${data.sortBy}&sortDesc=${data.sortDesc}&perPage=${data.perPage}&page=${data.page}&search=${data.search}`);
    }

    saveComite(data)
    {
        return this.axios.post(`${this.baseUrl}`, data);
    }
    
    editComite(id)
    {
        return this.axios.get(`${this.baseUrl}/`+id+`/edit`);
    }

    updateComite(data)
    {
        return this.axios.put(`${this.baseUrl}/${data.id}`,data);
    }

    deleteComite(id)
    {
        return this.axios.delete(`${this.baseUrl}/${id}`);
    }

    getComites()
    {
        return this.axios.get(`${this.baseUrl}-obtener`);
    }
}

export default ComiteService