
class PermisoService {
    axios
    baseUrl
    url

    constructor(axios, baseUrl){
        this.axios = axios
        this.baseUrl = `${baseUrl}/api/permisos`
        this.url = baseUrl
    }

    getPermisos()
    {
        return this.axios.get(`${this.baseUrl}`);
    }

    savePermiso(data)
    {
        return this.axios.post(`${this.baseUrl}`, data);
    }
    
    editPermiso(id)
    {
        return this.axios.get(`${this.baseUrl}/`+id+`/edit`);
    }

    updatePermiso(data)
    {
        return this.axios.put(`${this.baseUrl}/${data.id}`,data);
    }

    deletePermiso(id)
    {
        return this.axios.delete(`${this.baseUrl}/${id}`);
    }

    getPadres()
    {
        return this.axios.get(`${this.url}/api/padres`);
    }
}

export default PermisoService