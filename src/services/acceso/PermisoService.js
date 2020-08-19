
class PermisoService {
    axios
    baseUrl
    url

    constructor(axios, baseUrl){
        this.axios = axios
        this.baseUrl = `${baseUrl}/api/permisos`
        this.url = baseUrl
    }

    getPermisos(data)
    {
        return this.axios.get(`${this.baseUrl}?sortBy=${data.sortBy}&sortDesc=${data.sortDesc}&perPage=${data.perPage}&page=${data.page}&search=${data.search}`);

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

    getPermisosPorTitulo()
    {
        return this.axios.get(`${this.url}/api/permisos-titulo`);
    }
}

export default PermisoService