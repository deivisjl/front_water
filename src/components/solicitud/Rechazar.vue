<template>
    <v-container fluid>
        <loading v-if="loader"></loading>
        <v-row>
            <v-col md="8" offset="2">
                <v-card>
                    <v-toolbar dark color="grey lighten-4" dense>
                        <v-row align="center" justify="center">
                            <v-toolbar-title style="color:#000">{{ $t('miscelanius_reject_item') }}</v-toolbar-title>
                        </v-row>
                    </v-toolbar>
                    <v-card-text style="margin-top:10px">
                        <v-form :autocomplete="'off'" ref="form" @submit.prevent="validar()">
                            <v-select outlined dense v-model="model.persona" item-value="id" item-text="nombre" :items="personas" label="Persona quién realizó la visita"></v-select>
                            <form-error :attribute_name="'persona'" :errors_form="errors"> </form-error>

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
                                    label="Fecha de visita"
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

                                <v-text-field outlined dense name="rechazo" v-model="model.rechazo" v-validate="'required'" label="Motivo del rechazo"></v-text-field>
                                <form-error :attribute_name="'rechazo'" :errors_form="errors"> </form-error>
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
        personas:[],

        model:{
          persona:'',
          rechazo:'',
        },
      }
    },
    mounted(){
        this.config_error()
        this.obtener_personas()
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
        obtener_personas()
        {
            this.loader = true

            this.$store.state.services.comiteService
                .getComites()
                .then(r=>{
                    this.personas = r.data
                })  
                .catch(error=>{
                    if(error.response.data.code == 404 || error.response.data.code == 423 || error.response.data.code == 422)
                    {
                        Toastr.error(error.response.data.error, this.$t('message_title_global'))
                    }
                    else
                    {
                        Toastr.error(error,this.$t('message_title_global'))
                    }

                })
                .finally(()=>{
                    this.loader = false
                })
        },
        guardar(){
          let datos = {
            'id':this.$route.params.id,
            'persona_id':this.model.persona,
            'fecha_visita':this.fromDateDisp,
            'motivo': this.model.rechazo,
          }
          
          this.loader = true
          this.$store.state.services.solicitudService
                .rechazarSolicitud(datos)
                .then(r=>{
                    this.loader = false
                    toastr.success(this.$t('message_result_success'),this.$t('message_title_global'))
                    this.$router.push({path:`/solicitudes`})                    
                })
                .catch(error=>{
                   this.loader = false
                   toastr.error(this.$t('message_result_error') + error,this.$t('message_title_global'))
                })
        },
        cancelar(){
            this.$router.push({path:`/solicitudes`})
        },
        config_error(){
            let self = this
               let dict = {
                custom:{
                    usuario:{
                        required:this.$t('global_validation_required',{field:'La persona que hizo la visita'}),
                    },
                    fecha:{
                        required:this.$t('global_validation_required',{field:'La fecha'}),
                    },
                    rechazo:{
                        required:this.$t('global_validation_required',{field:'El motivo del rechazo'}),
                    }
                }
               }

              self.$validator.localize('es',dict);
          },
    }
  }
</script>