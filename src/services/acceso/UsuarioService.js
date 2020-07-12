
class UsuarioService {
    axios
    baseUrl
    url

    constructor(axios, baseUrl){
        this.axios = axios
        this.baseUrl = `${baseUrl}/api/usuarios`
        this.url = baseUrl
    }

    getUsuarios()
    {
        return this.axios.get(`${this.baseUrl}`);
    }

    saveUsuario(data)
    {
        return this.axios.post(`${this.baseUrl}`, data);
    }
    
    editUsuario(id)
    {
        return this.axios.get(`${this.baseUrl}/`+id+`/edit`);
    }

    updateUsuario(data)
    {
        return this.axios.put(`${this.baseUrl}/${data.id}`,data);
    }

    deleteUsuario(id)
    {
        return this.axios.delete(`${this.baseUrl}/${id}`);
    }

    editRoles(id)
    {
        return this.axios.get(`${this.url}/api/usuarios-roles/${id}`);
    }
    updateRoles(data)
    {
        return this.axios.post(`${this.url}/api/usuarios-roles`,data);
    }
}

export default UsuarioService