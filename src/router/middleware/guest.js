import router from '../'

export default function auth ({ next, store }){
    if(store.state.services.loginService.verifyAuthCredentials()){
        return router.push('/').catch(err => {})
    }
    else{
    	return next()
    }
}