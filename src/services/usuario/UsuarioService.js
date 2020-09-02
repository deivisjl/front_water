
class UsuarioService {
    axios
    baseUrl
    url

    constructor(axios, baseUrl){
        this.axios = axios
        this.baseUrl = `${baseUrl}/api/usuarios`
        this.url = baseUrl
    }

    getUsuarios(data)
    {
        return this.axios.get(`${this.baseUrl}?sortBy=${data.sortBy}&sortDesc=${data.sortDesc}&perPage=${data.perPage}&page=${data.page}&search=${data.search}`);
    }

    saveUsuarios(data)
    {
        return this.axios.post(`${this.baseUrl}`, data);
    }
    
    editUsuarios(id)
    {
        return this.axios.get(`${this.baseUrl}/`+id+`/edit`);
    }

    updateUsuarios(data)
    {
        return this.axios.put(`${this.baseUrl}/${data.id}`,data);
    }

    deleteUsuarios(id)
    {
        return this.axios.delete(`${this.baseUrl}/${id}`);
    }
}

export default UsuarioService