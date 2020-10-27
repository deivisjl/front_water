
class BackupService {
    axios
    url

    constructor(axios, baseUrl){
        this.axios = axios
        this.url = baseUrl
    }

    createBackup()
    {
        return this.axios.post(`${this.url}/api/backup-crear`);
    }

    showBackup(data)
    {
        return this.axios.get(`${this.url}/api/backup-mostrar?sortBy=${data.sortBy}&sortDesc=${data.sortDesc}&perPage=${data.perPage}&page=${data.page}&search=${data.search}`);
    }

    downloadBackup(id)
    {
        return this.axios({
            url:this.url+'/api/backup-descargar/'+id,
            method:'GET',
            responseType:'blob'
        })
    }

    deleteBackup(id)
    {
        return this.axios.get(`${this.url}/api/backup-eliminar/` +  id);
    }
}

export default BackupService