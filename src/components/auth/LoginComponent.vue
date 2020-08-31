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
                                        v-validate="'required|numeric'"
                                        style="margin-bottom: 10px"
                                        autofocus
                                        outlined
                                        dense
                                        name="usuario"
                                        :label="$t('login_placeholder_username')" 
                                        hide-details="auto" v-model="form.email"></v-text-field>
                                <FormError :attribute_name="'usuario'" :errors_form="errors"> </FormError>
                                <v-text-field
                                    v-validate="'required|min:5'"
                                    style="margin-bottom: 10px"
                                    outlined
                                    dense
                                    name="password" 
                                    :label="$t('login_placeholder_password')" 
                                    :type="showPassword ? 'text' : 'password'" 
                                    append-icon="visibility_off" 
                                    @click:append="showPassword = !showPassword"
                                    v-model="form.password"
                                    hide-details="auto"
                                    @keydown.enter="validar">
                                </v-text-field>
                                <FormError :attribute_name="'password'" :errors_form="errors"> </FormError>
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
import FormError from "@/components/shared/FormError"

export default {
  name: 'Login',
  components:{
    loading,
    FormError
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
  mounted(){
      this.config_error()
  },
  created(){
      let fecha = moment().add(3600,'second')
      /* console.log(fecha.format('DD-MM-YYYY HH:mm:ss')) */
      let timestamp = Math.floor(fecha / 1000) 
  },
  methods:{
      validar(){
        this.$validator.validateAll().then((result) =>{
              if(result){
                this.autenticar();
              }             
        });
      },
      autenticar(){
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
                this.loader = false
                if(_.includes(error.response.data.error,'invalid_grant'))
                {
                    toastr.error(this.$t('message_result_login_error'),this.$t('message_title_global'))
                }
                else
                {
                    toastr.error(this.$t('message_result_error') + error,this.$t('message_title_global'))
                }
            })
      },
      obtener_menu(){
          this.loader = true
          this.$store.state.services.loginService
            .getMenu()
            .then(r=>{
                this.loader = false
                this.$store.state.services.loginService.storeMenu(r.data)
                events.$emit("obtener_menu",true)
                this.$router.push({ name: "home" });
            })
            .catch(error =>{
                this.loader = false
            })
      },
      config_error(){
            let self = this
               let dict = {
                custom:{
                  usuario:{
                    required:this.$t('global_validation_required',{field:'El usuario'}),
                    numeric:this.$t('global_validation_numeric',{field:'El usuario'}),
                  },
                  password:{
                    required:this.$t('global_validation_required',{field:'La contraseña'}),
                    min: (field,params) => this.$t('global_validation_min',{field:'La contraseña',param:params[0]}),
                  },  
                  
                }
               }

              self.$validator.localize('es',dict);
          },
  }
}
</script>
