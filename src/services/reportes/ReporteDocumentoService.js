
class ReporteDocumentoService {
    axios
    baseUrl
    url

    constructor(axios, baseUrl){
        this.axios = axios
        this.url = baseUrl
    }

    obtener_estados()
    {
        return this.axios.get(`${this.url}/api/reporte-obtener-estados`);
    }

    generar_reporte_servicio(datos)
    {
        return this.axios({
            url:this.url+'/api/generar-reporte-servicios',
            data:datos,
            method:'POST',
            responseType:'blob'
        })
    }

    generar_reporte_solicitudes(datos)
    {
        return this.axios({
            url:this.url+'/api/generar-reporte-solicitudes',
            data:datos,
            method:'POST',
            responseType:'blob'
        })
    }

    generar_reporte_morosos(datos)
    {
        return this.axios({
            url:this.url+'/api/generar-reporte-morosos',
            data:datos,
            method:'POST',
            responseType:'blob'
        })
    }

    generar_reporte_recaudacion(datos)
    {
        return this.axios({
            url:this.url+'/api/generar-reporte-recaudacion',
            data:datos,
            method:'POST',
            responseType:'blob'
        })
    }
}

export default ReporteDocumentoService