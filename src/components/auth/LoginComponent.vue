<template>
<v-container class="fluid fill-height">
        <loading v-if="loader"></loading>
        <v-layout class="justify-center">
            <v-flex class="xs12 sm8 md4">
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-row align="center" justify="center">
                            <v-toolbar-title>{{ $t('login_title_bar')}} - SISCAP</v-toolbar-title>
                        </v-row>
                    </v-toolbar>
                    <v-card-text>
                        <v-form :autocomplete="'off'" ref="form">
                            <v-text-field 
                                    style="margin-bottom: 10px"
                                    autofocus
                                    outlined
                                    dense
                                    prepend-icon="person" 
                                    :label="$t('login_placeholder_username')" 
                                    hide-details="auto" v-model="form.email"></v-text-field>
                            
                            <v-text-field
                                outlined
                                dense 
                                prepend-icon="lock" 
                                :label="$t('login_placeholder_password')" 
                                :type="showPassword ? 'text' : 'password'" 
                                append-icon="visibility_off" 
                                @click:append="showPassword = !showPassword"
                                v-model="form.password">
                            </v-text-field>
                        </v-form>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="validar">{{ $t('login_btn_title') }}</v-btn>
                        </v-card-actions>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import loading from "../shared/loading"
import moment from 'moment'

export default {
  name: 'Login',
  components:{
    loading
  },
  data () {
    return {
      showPassword: false,
      loader: false,
      form:{
          email:'',
          password:'',
      }
    }
  },
  created(){
      let fecha = moment().add(3600,'second')
      /* console.log(fecha.format('DD-MM-YYYY HH:mm:ss')) */
      let timestamp = Math.floor(fecha / 1000) 
  },
  methods:{
      validar(){
          this.loader = true

          let data = {
              'email': this.form.email,
              'password': this.form.password
          }

          this.$store.state.services.loginService
            .login(data)
            .then(r=>{
                this.loader = false
                if(r.status === 200)
                {
                    let expires = this.$store.state.services.loginService.convertToUnixDate(r.data.expires_in)
                    let auth = {
                        'token_expires_at':expires,
                        'access_token':r.data.token_type + ' ' + r.data.access_token,
                        'refresh_token':r.data.refresh_token
                    }
                    
                    this.$store.state.services.loginService.storeCredentials(auth)
                    this.obtener_menu()
                }
            })
            .catch(error =>{
                console.log(error)
                this.loader = false
            })
      },
      obtener_menu(){
          this.loader = true
          this.$store.state.services.loginService
            .getMenu()
            .then(r=>{
                this.loader = false
                this.$store.state.services.loginService.storeMenu(r.data)
                this.$router.push({ name: "home" });
            })
            .catch(error =>{
                this.loader = false
            })
      }
  }
}
</script>