export default function menu ({to, next, store }){
    
    if(_.isEmpty(store.state.menu) && store.state.services.loginService.verifyAuthCredentials())
    {
        window.events.$emit("obtener_menu",true)
        return next({name:'home'})

        /* return next({name:'home'})
        //return next('/')
        let ruta = to.path.split("/")
        ruta.shift()
        let params = to.params
        if(!_.isEmpty(params)){
            ruta.pop()
        }

        let path = ruta.join("/")
        console.log(path) */
        //console.log(ruta)
    }
   
    return next()
}