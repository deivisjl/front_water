
class SolicitudService {
    axios
    baseUrl
    url

    constructor(axios, baseUrl){
        this.axios = axios
        this.baseUrl = `${baseUrl}/api/solicitudes`
        this.url = baseUrl
    }

    getSolicitudes(data)
    {
        return this.axios.get(`${this.baseUrl}?sortBy=${data.sortBy}&sortDesc=${data.sortDesc}&perPage=${data.perPage}&page=${data.page}&search=${data.search}`);
    }

    saveSolicitud(data)
    {
        return this.axios.post(`${this.baseUrl}`, data);
    }

    editSolicitud(id)
    {
        return this.axios.get(`${this.baseUrl}/`+id+`/edit`);
    }

    updateSolicitud(data)
    {
        return this.axios.put(`${this.baseUrl}/${data.id}`,data);
    }

    aprobarSolicitud(data)
    {
        return this.axios.post(`${this.url}/api/solicitudes-aprobar`,data);
    }

    rechazarSolicitud(data)
    {
        return this.axios.post(`${this.url}/api/solicitudes-rechazar`,data);
    }
}

export default SolicitudService