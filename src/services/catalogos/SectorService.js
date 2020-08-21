
class SectorService {
    axios
    baseUrl
    url

    constructor(axios, baseUrl){
        this.axios = axios
        this.baseUrl = `${baseUrl}/api/sectores`
        this.url = baseUrl
    }

    getSector(data)
    {
        return this.axios.get(`${this.baseUrl}?sortBy=${data.sortBy}&sortDesc=${data.sortDesc}&perPage=${data.perPage}&page=${data.page}&search=${data.search}`);
    }

    saveSector(data)
    {
        return this.axios.post(`${this.baseUrl}`, data);
    }
    
    editSector(id)
    {
        return this.axios.get(`${this.baseUrl}/`+id+`/edit`);
    }

    updateSector(data)
    {
        return this.axios.put(`${this.baseUrl}/${data.id}`,data);
    }

    deleteSector(id)
    {
        return this.axios.delete(`${this.baseUrl}/${id}`);
    }
}

export default SectorService