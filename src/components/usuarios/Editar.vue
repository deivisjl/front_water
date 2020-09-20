<template>
     <v-container fluid>
        <loading v-if="loader"></loading>
        <v-row>
            <v-col md="8" offset="2">
                <v-card>
                    <v-toolbar dark color="grey lighten-4" dense>
                        <v-row align="center" justify="center">
                            <v-toolbar-title style="color:#000">{{ $t('miscelanius_edit_item') }}</v-toolbar-title>
                        </v-row>
                    </v-toolbar>
                    <v-card-text style="margin-top:10px">
                        <v-tabs
                            background-color="primary"
                            dark>
                            <v-tab>{{ $t('message_tab_personal_data') }}</v-tab>
                            <v-tab-item>
                                 <v-card>
                                     <v-card-text>
                                         <form autocomplete="off" @submit.prevent="validar_datos_formulario('datos_generales',1)" data-vv-scope="datos_generales">
                                            <v-text-field outlined dense autofocus name="primer_nombre" v-model="model.primer_nombre" v-validate="'required'" label="Primer nombre"></v-text-field>
                                            <form-error :attribute_name="'datos_generales.primer_nombre'" :errors_form="errors"> </form-error>
                                            <v-text-field outlined dense  name="segundo_nombre" v-model="model.segundo_nombre" label="Segundo nombre"></v-text-field>
                                            <form-error :attribute_name="'segundo_nombre'" :errors_form="errors"> </form-error>
                                            <v-text-field outlined dense  name="datos_generales.tercer_nombre" v-model="model.tecer_nombre" label="Tercer nombre"></v-text-field>
                                            <form-error :attribute_name="'tercer_nombre'" :errors_form="errors"> </form-error>
                                            <v-text-field outlined dense  name="primer_apellido" v-model="model.primer_apellido" v-validate="'required'" label="Primer apellido"></v-text-field>
                                            <form-error :attribute_name="'datos_generales.primer_apellido'" :errors_form="errors"> </form-error>
                                            <v-text-field outlined dense  name="segundo_apellido" v-model="model.segundo_apellido" label="Segundo apellido"></v-text-field>
                                            <form-error :attribute_name="'datos_generales.segundo_apellido'" :errors_form="errors"> </form-error>

                                            <v-btn color="primary" type="submit">{{ $t('miscelanius_save_item') }}</v-btn>
                                        </form>
                                     </v-card-text>
                                 </v-card>
                            </v-tab-item>
                            <v-tab>{{ $t('message_tab_notification_data') }}</v-tab>
                            <v-tab-item>
                                <v-card>
                                    <v-card-text>
                                        <form autocomplete="off" @submit.prevent="validar_datos_formulario('notificacion',2)" data-vv-scope="notificacion">
                                            <v-text-field outlined dense :autofocus="(e6 ==2 ) ? 'autofocus' : ''" name="direccion" v-model="model.direccion" v-validate="'required'" label="Dirección residencia"></v-text-field>
                                            <form-error :attribute_name="'notificacion.direccion'" :errors_form="errors"> </form-error>
                                            <v-text-field outlined dense name="telefono" v-model="model.telefono" v-validate="'required|numeric'" label="Teléfono"></v-text-field>
                                            <form-error :attribute_name="'notificacion.telefono'" :errors_form="errors"> </form-error>
                                            <v-btn color="primary" type="submit">{{ $t('miscelanius_save_item') }}</v-btn>
                                        </form>
                                    </v-card-text>
                                </v-card>
                            </v-tab-item>
                            <v-tab>{{ $t('message_tab_account_data') }}</v-tab>
                            <v-tab-item>
                                <v-card>
                                    <v-card-text>
                                        <form autocomplete="off" @submit.prevent="validar_datos_formulario('cuenta', 3)" data-vv-scope="cuenta">
                                            <v-text-field outlined dense autofocus name="dpi" v-model="model.dpi" v-validate="'required|numeric|min:13'" label="DPI"></v-text-field>
                                            <form-error :attribute_name="'cuenta.dpi'" :errors_form="errors"> </form-error>
                                            <v-text-field outlined dense name="email" v-model="model.correo" v-validate="'email'" label="Correo electrónico"></v-text-field>
                                            <form-error :attribute_name="'cuenta.email'" :errors_form="errors"> </form-error>
                                            <!--  -->
                                            <v-btn color="primary" type="submit">{{ $t('miscelanius_save_item') }}</v-btn>
                                        </form>
                                    </v-card-text>
                                </v-card>
                            </v-tab-item>
                        </v-tabs>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import loading from "@/components/shared/loading"
import FormError from "@/components/shared/FormError"

  export default {
    components:{
        loading,
        FormError
    },
    data () {
      return {
        dialog: true,
        loader:false,
        e6: 1,
        tab: null,
        model:{
          id:'',
          primer_nombre:'',
          segundo_nombre:'',
          tercer_nombre:'',
          primer_apellido:'',
          segundo_apellido:'',
          direccion:'',
          telefono:'',
          dpi:'',
          correo:''
        },
      }
    },
    mounted(){
        this.config_error()
        this.model.id = this.$route.params.id
        this.obtener_registro()
    },
    created(){
     
    },
    methods:{
        obtener_registro()
        {
            this.loader = true
            this.$store.state.services.usuariosService
              .editUsuario(this.model.id)
              .then(r=>{
                  this.loader = false
                    this.model.primer_nombre = r.data.data.primer_nombre
                    this.model.segundo_nombre = r.data.data.segundo_nombre
                    this.model.tercer_nombre = r.data.data.tercer_nombre
                    this.model.primer_apellido = r.data.data.primer_apellido
                    this.model.segundo_apellido = r.data.data.segundo_apellido
                    this.model.direccion = r.data.data.direccion_residencia
                    this.model.telefono = r.data.data.telefono
                    this.model.dpi = r.data.data.email
                    this.model.correo = r.data.data.correo_electronico
              })
              .catch(error=>{
                 this.loader = false
                 if(error.response.data.code === 422)
                 {
                    for (let value of Object.values(error.response.data.error)) {
                      this.$toastr.error(value, this.$t('message_title_global'))
                    }
                    return
                 }

                 toastr.error(this.$t('message_result_error') + error,this.$t('message_title_global'))
              })
        },
      validar_datos_formulario(scope, form){
          this.$validator.validateAll(scope).then((result) => { 
              if(result)
              {
                  this.editar()
              }
          });
      },
      editar(){
        
        let datos = {
          'id':this.model.id,
          'primer_nombre':this.model.primer_nombre,
          'segundo_nombre':this.model.segundo_nombre,
          'tercer_nombre':this.model.tercer_nombre,
          'primer_apellido':this.model.primer_apellido,
          'segundo_apellido':this.model.segundo_apellido,
          'direccion':this.model.direccion,
          'telefono':this.model.telefono,
          'email':this.model.dpi,
          'correo_electronico':this.model.correo
        }

        this.loader = true
        this.$store.state.services.usuariosService
              .updateUsuarios(datos)
              .then(r=>{
                  this.loader = false
                  toastr.success(this.$t('message_result_success'),this.$t('message_title_global'))                  
              })
              .catch(error=>{
                 this.loader = false
                 if(error.response.data.code === 422)
                 {
                    for (let value of Object.values(error.response.data.error)) {
                      this.$toastr.error(value, this.$t('message_title_global'))
                    }
                    return
                 }

                 toastr.error(this.$t('message_result_error') + error,this.$t('message_title_global'))
              })
        },
        cancelar(){
            this.$router.push({path:`/usuarios`})
        },
        config_error(){
            let self = this
               let dict = {
                custom:{
                  primer_nombre:{
                      required:this.$t('global_validation_required',{field:'El primer nombre'}),
                  },
                  segundo_nombre:{

                  },
                  tercer_nombre:{

                  },
                  primer_apellido:{
                      required:this.$t('global_validation_required',{field:'El primer apellido'}),
                  },
                  segundo_apellido:{

                  },
                  direccion:{
                     required:this.$t('global_validation_required',{field:'La dirección'}),
                  },
                  telefono:{
                     required:this.$t('global_validation_required',{field:'El teléfono'}),
                     numeric:this.$t('global_validation_numeric',{field:'El teléfono'}),
                  },
                  dpi:{
                    required:this.$t('global_validation_required',{field:'El dpi'}),
                    numeric:this.$t('global_validation_numeric',{field:'El dpi'}),
                    min:(field,params) => this.$t('global_validation_min',{field:'El dpi', param:params[0]}),
                  },
                  email:{
                    required:this.$t('global_validation_required',{field:'El correo electrónico'}),
                    email:this.$t('global_validation_valid',{field:'El correo electrónico'}),
                  }
                }
               }

              self.$validator.localize('es',dict);
          },
    }
  }
</script>