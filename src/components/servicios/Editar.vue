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
                        <v-form :autocomplete="'off'" ref="form" lazy-validation>
                            <v-select outlined dense v-model="model.estado" name="estado" item-value="id" item-text="nombre" :items="items" label="Cambiar estado"></v-select>
                            <form-error :attribute_name="'estado'" :errors_form="errors"> </form-error>
                        </v-form>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-btn color="grey darken-2" text @click="cancelar()">
                        {{ $t('miscelanius_cancel_item') }}
                        </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="validar()">
                        {{ $t('miscelanius_update_item') }}
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
        checkbox:true,

        model:{
          id:'',
          estado:'',
        },
        items:[],
      }
    },
    mounted(){
       this.config_error()
    },
    created(){
        this.obtener_datos()
    },
    methods:{
        validar(){
        this.$validator.validateAll().then((result) =>{
                if(result){
                  this.editar_estado();
                }             
          });
        },
        obtener_datos()
        {
            this.loader = true

            Promise.all([this.obtener_estado_actual(), this.obtener_estados()])
                .then((r)=>{})
                .catch((error)=>{
                    toastr.error(this.$t('message_result_error') + error,this.$t('message_title_global'))
                })
                .finally(()=>{
                    this.loader = false
                })
        },

        obtener_estado_actual(){
            return new Promise((resolve, reject)=>{
                this.$store.state.services.servicioService
                    .obtenerServicioEditar(this.$route.params.id)
                    .then((r) =>{
                        this.model.estado = r.data.estado_servicio_id
                        resolve()
                    })
                    .catch((error)=>{
                        reject(error)
                    })
            })
        },
        obtener_estados(){
            return new Promise((resolve, reject)=>{
                this.$store.state.services.estadoServicioService
                    .editarEstadoServicio()
                    .then((r) =>{
                        this.items = r.data
                        resolve()
                    })
                    .catch((error)=>{
                        reject(error)
                    })
            })
        },
        editar_estado(){
            
          let datos = {
            'id':this.$route.params.id,
            'estado':this.model.estado,
          }
          this.loader = true
          this.$store.state.services.servicioService
                .updateServicio(datos)
                .then(r=>{
                    this.loader = false
                    toastr.success(this.$t('message_result_edit_success'),this.$t('message_title_global'))
                    this.$router.push({path:`/servicios`})                    
                })
                .catch(error=>{
                   this.loader = false
                   toastr.error(this.$t('message_result_error') + error,this.$t('message_title_global'))
                })
        },
        cancelar(){
            this.$router.push({path:`/servicios`})
        },
        config_error(){
            let self = this
               let dict = {
                custom:{
                  estado:{
                      required:this.$t('global_validation_required',{field:'El estado'}),
                  },
                }
               }

              self.$validator.localize('es',dict);
          },
    }
  }
</script>