export default function guest ({ next, store }){
    if(store.state.services.loginService.verifyAuthCredentials()){
        return next({
           name: 'home'
        })
    }   
    return next()
}