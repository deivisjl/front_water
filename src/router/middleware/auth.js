export default function auth ({ next, store }){
    if(!store.state.services.loginService.verifyAuthCredentials()){
        return next({
           name: 'login'
        })
    }
   
    return next()
}