
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

   /*  saveUsuarios(data)
    {
        return this.axios.post(`${this.baseUrl}`, data);
    } */
    saveUsuarios(datos)
    {
        return this.axios({
            url:this.baseUrl,
            data:datos,
            method:'POST',
            responseType:'blob'
        })
        //return this.axios.post(`${this.baseUrl}`, data);
    }
    getUsuario(id)
    {
        return this.axios.get(`${this.baseUrl}/`+id);
    }

    editUsuario(id)
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
    searchUsuario(criterio)
    {
        return this.axios.get(`${this.url}/api/usuario-buscar/${criterio}`);
    }
}

export default UsuarioService