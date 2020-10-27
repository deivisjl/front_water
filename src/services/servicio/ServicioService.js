
class ServicioService {
    axios
    baseUrl
    url

    constructor(axios, baseUrl){
        this.axios = axios
        this.baseUrl = `${baseUrl}/api/servicios`
        this.url = baseUrl
    }

    getServicio(data)
    {
        return this.axios.get(`${this.baseUrl}?sortBy=${data.sortBy}&sortDesc=${data.sortDesc}&perPage=${data.perPage}&page=${data.page}&search=${data.search}`);
    }

    detailServicio(id)
    {
        return this.axios.get(`${this.baseUrl}-detalle/` + id);
    }

    obtenerServicios(id)
    {
        return this.axios.get(`${this.baseUrl}-usuario/` + id);
    }

    titularServicio(id)
    {
        return this.axios.get(`${this.url}/api/servicio-titular/` + id);
    }

    getTitularServicio(id)
    {
        return this.axios.get(`${this.url}/api/servicio-titular-detalle/` + id);
    }

    updateServicio(data)
    {
        return this.axios.put(`${this.baseUrl}/${data.id}`,data);
    }

    obtenerServicioEditar(id)
    {
        return this.axios.get(`${this.url}/api/servicios/` + id);
    }
}

export default ServicioService