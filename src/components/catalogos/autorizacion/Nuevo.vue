<template>
    <v-container fluid>
        <loading v-if="loader"></loading>
        <v-row>
            <v-col md="8" offset="2">
                <v-card>
                    <v-toolbar dark color="grey lighten-4" dense>
                        <v-row align="center" justify="center">
                            <v-toolbar-title style="color:#000">{{ $t('miscelanius_new_item') }}</v-toolbar-title>
                        </v-row>
                    </v-toolbar>
                    <v-card-text style="margin-top:10px">
                        <v-form :autocomplete="'off'" ref="form" lazy-validation>

                            <v-text-field outlined dense autofocus name="nombre_comite" v-model="model.nombre_comite" v-validate="'required'" label="Nombre del comité"></v-text-field>
                            <form-error :attribute_name="'nombre_comite'" :errors_form="errors"> </form-error>

                            <v-text-field outlined dense name="municipio" v-model="model.municipio" v-validate="'required'" label="Municipio y departamento"></v-text-field>
                            <form-error :attribute_name="'municipio'" :errors_form="errors"> </form-error>

                            <v-text-field outlined dense name="no_autorizacion" v-model="model.no_autorizacion" v-validate="'required'" label="No. autorización"></v-text-field>
                            <form-error :attribute_name="'no_autorizacion'" :errors_form="errors"> </form-error>

                            <v-text-field outlined dense name="no_contraloria" v-model="model.no_contraloria" v-validate="'required'" label="No. registro de contraloría"></v-text-field>
                            <form-error :attribute_name="'no_contraloria'" :errors_form="errors"> </form-error>

                            <v-menu
                                v-model="fromDateMenu"
                                :close-on-content-click="false"
                                :nudge-right="40"                                
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="290px"
                                >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                    label="Fecha de autorización"
                                    outlined
                                    dense
                                    readonly
                                    name="fecha"
                                    v-validate="'required'"
                                    :value="fromDateDisp"
                                    v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    locale="es-es"
                                    v-model="fromDateVal"
                                    no-title
                                    @input="fromDateMenu = false"
                                ></v-date-picker>
                                </v-menu>
                                <form-error :attribute_name="'fecha'" :errors_form="errors"> </form-error>
                        </v-form>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-btn color="grey darken-2" text @click="cancelar()">
                        {{ $t('miscelanius_cancel_item') }}
                        </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="validar()">
                        {{ $t('miscelanius_save_item') }}
                    </v-btn>
                    </v-card-actions>
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

        fromDateMenu:false,
        fromDateVal:null,

        model:{
            nombre_comite:'',
            municipio:'',
            no_autorizacion:'',
            no_contraloria:'',
        },
      }
    },
    mounted(){
        this.config_error()
    },
    created(){
     
    },
     computed:{
        fromDateDisp(){
            return this.fromDateVal
        }
    },
    methods:{
        validar(){
        this.$validator.validateAll().then((result) =>{
                if(result){
                  this.guardar();
                }             
          });
        },
        guardar(){
          let datos = {
            'nombre_comite':this.model.nombre_comite,
            'municipio':this.model.municipio,
            'no_autorizacion':this.model.no_autorizacion,
            'no_contraloria':this.model.no_contraloria,
            'fecha':this.fromDateDisp
          }
          
          this.loader = true
          this.$store.state.services.autorizacionService
                .saveAutorizacion(datos)
                .then(r=>{
                    this.loader = false
                    toastr.success(this.$t('message_result_success'),this.$t('message_title_global'))
                    this.$router.push({path:`/autorizaciones`})                    
                })
                .catch(error=>{
                   this.loader = false
                   toastr.error(this.$t('message_result_error') + error,this.$t('message_title_global'))
                })
        },
        cancelar(){
            this.$router.push({path:`/autorizaciones`})
        },
        config_error(){
            let self = this
               let dict = {
                custom:{
                    nombre_comite:{
                      required:this.$t('global_validation_required',{field:'El nombre del comité'}),  
                    },
                    municipio:{
                        required:this.$t('global_validation_required',{field:'El lugar'}),
                    },
                    no_autorizacion:{
                        required:this.$t('global_validation_required',{field:'La autorización'}),
                    },
                    no_contraloria:{
                        required:this.$t('global_validation_required',{field:'El registro de contraloría'}),
                    },
                    fecha:{
                        required:this.$t('global_validation_required',{field:'La fecha'}),
                    },
                }
               }

              self.$validator.localize('es',dict);
          },
    }
  }
</script>