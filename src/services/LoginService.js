import store from '../store/index'
import moment from 'moment'

class LoginService {
    axios
    baseUrl
    url
    credentials

    SISCAP_AUTH = "SISCAP_AUTH"
    SISCAP_MENU = "SISCAP_MENU"

    constructor(axios, baseUrl, credentials){
        this.axios = axios
        this.baseUrl = `${baseUrl}/api/oauth/token`
        this.url = baseUrl
        this.credentials = credentials
    }

    login(data)
    {
        let datos = {
            'grant_type':this.credentials.GRANT_TYPE,
            'client_id':this.credentials.CLIENT_ID,
            'client_secret':this.credentials.CLIENT_SECRET,
            'username':data.email,
            'password':data.password
        }

        return this.axios.post(`${this.baseUrl}`,datos);
    }
    
    refreshToken()
    {   
        return new Promise((resolve,reject)=>{
            let refresh_token = this.getRefreshToken()
            console.log("Refrescando")
            if(!this.existingValidToken() && !refresh_token)
            {
                this.logout()
                return false
            }
            
            let datos = {
                'grant_type':this.credentials.GRANT_TYPE_REFRESH,
                'client_id':this.credentials.CLIENT_ID,
                'client_secret':this.credentials.CLIENT_SECRET,
                'refresh_token':refresh_token
            }
            this.axios.post(`${this.baseUrl}`,datos)
                .then(r => {
                    let timestamps = this.convertToUnixDate(r.data.expires_in)
                    let auth = {
                        'token_expires_at':timestamps,
                        'access_token':r.data.token_type + ' ' + r.data.access_token,
                        'refresh_token':r.data.refresh_token
                    }
                    this.storeCredentials(auth)

                    resolve(this.existingValidToken())
                })
                .catch(error => {
                    reject(false)
                });
        });
    }

    logout(){
        store.state.user.loggedIn = false
        this.removeCredentials()
    }

    storeCredentials(data){
        localStorage.setItem(this.SISCAP_AUTH, JSON.stringify(data))
        store.state.user.loggedIn = true
    }

    existingValidToken(){
        let auth = JSON.parse(localStorage.getItem(this.SISCAP_AUTH))

        if(auth){
            if(auth.token_expires_at > this.getUnixDate()){
                return auth.access_token
            }
        }

        return false
    }

    removeCredentials(){
        localStorage.removeItem(this.SISCAP_AUTH)
        localStorage.removeItem(this.SISCAP_MENU)
    }

    getRefreshToken(){
        let auth = JSON.parse(localStorage.getItem(this.SISCAP_AUTH))
        return auth ? auth.refresh_token : null
    }

    convertToUnixDate(seconds){
        let fecha = moment().add((seconds - 5),'second')
        let timestamp = Math.floor(fecha / 1000) 

        return timestamp
    }

    getUnixDate(){
        let fecha = moment.now()        
        let timestamp = Math.floor(fecha / 1000) 

        return timestamp
    }

    verifyAuthCredentials(){
        let auth = JSON.parse(localStorage.getItem(this.SISCAP_AUTH))
        return auth ? true : false
    }

    getMenu(){
        return this.axios.get(`${this.url}/api/usuario-rol`);
    }

    storeMenu(data){
        localStorage.setItem(this.SISCAP_MENU, JSON.stringify(data))
    }

    removeMenu(){
        localStorage.removeItem(this.SISCAP_MENU)
    }

    getStorageMenu(){
        return JSON.parse(localStorage.getItem(this.SISCAP_MENU))
    }
}

export default LoginService