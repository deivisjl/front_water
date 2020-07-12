
class RolService {
    axios
    baseUrl
    url

    constructor(axios, baseUrl){
        this.axios = axios
        this.baseUrl = `${baseUrl}/api/roles`
        this.url = baseUrl
    }

    getRoles()
    {
        return this.axios.get(`${this.baseUrl}`);
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
}

export default RolService