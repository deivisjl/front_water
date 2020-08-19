
class RolService {
    axios
    baseUrl
    url

    constructor(axios, baseUrl){
        this.axios = axios
        this.baseUrl = `${baseUrl}/api/roles`
        this.url = baseUrl
    }

    getRoles(data)
    {
        return this.axios.get(`${this.baseUrl}?sortBy=${data.sortBy}&sortDesc=${data.sortDesc}&perPage=${data.perPage}&page=${data.page}&search=${data.search}`);
    }

    saveRol(data)
    {
        return this.axios.post(`${this.baseUrl}`, data);
    }
    
    editRol(id)
    {
        return this.axios.get(`${this.baseUrl}/`+id+`/edit`);
    }

    updateRol(data)
    {
        return this.axios.put(`${this.baseUrl}/${data.id}`,data);
    }

    deleteRol(id)
    {
        return this.axios.delete(`${this.baseUrl}/${id}`);
    }
    getAllRoles(data)
    {
        return this.axios.get(`${this.url}/api/roles-obtener`);
    }
}

export default RolService