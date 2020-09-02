import router from '../'

export default function menu ({to, next, store }){
    
    if(_.isEmpty(store.state.menu) && store.state.services.loginService.verifyAuthCredentials())
    {
        window.events.$emit("obtener_menu",true)
    }
        /*separa la ruta requerida en el navegado para limpiar los parametros*/
        let ruta = to.path.split("/")
        ruta.shift()
        let params = to.params
        if(!_.isEmpty(params)){
            ruta.pop()
        }
        /*unir la ruta si parametros */
        let path = "/" + ruta.join("/")
        /* obtener todos los permisos del usuario*/
        let permisos = store.state.permisos
        
        var permiso = _.includes(permisos, path) //verificar si el usuario posee el permiso

        return permiso ? next() : router.push('/').catch(err => {})
}