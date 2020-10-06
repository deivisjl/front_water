
class ReporteService {
    axios
    baseUrl
    url

    constructor(axios, baseUrl){
        this.axios = axios
        this.url = baseUrl
    }

    grafica_recaudacion(data)
    {
        return this.axios.post(`${this.url}/api/grafica-recaudacion-general`,data);
    }

    grafica_solicitud(data)
    {
        return this.axios.post(`${this.url}/api/grafica-solicitud-servicio`,data);
    }

    grafica_recaudacion_tipo(data)
    {
        return this.axios.post(`${this.url}/api/grafica-recaudacion-tipo`,data);
    }
}

export default ReporteService