import router from '../'

export default function auth ({ next, store }){
    if(!store.state.services.loginService.verifyAuthCredentials()){
        store.state.services.loginService.logout()
        return router.push('/login').catch(err => {})
    }else{
    	return next()
    }
}