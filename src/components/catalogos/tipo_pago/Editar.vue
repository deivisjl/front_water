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

                            <v-text-field outlined dense autofocus name="nombre" v-model="model.nombre" v-validate="'required'" label="Nombre"></v-text-field>
                            <form-error :attribute_name="'nombre'" :errors_form="errors"> </form-error>

                            <v-text-field outlined dense autofocus name="monto" v-model="model.monto" v-validate="'required|decimal'" label="Monto"></v-text-field>
                            <form-error :attribute_name="'monto'" :errors_form="errors"> </form-error>

                            <v-text-field outlined dense name="descripcion" v-model="model.descripcion" v-validate="'required'" label="Descripción" v-on:keyup.enter="validar()"></v-text-field>
                            <form-error :attribute_name="'descripcion'" :errors_form="errors"> </form-error>
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

        model:{
          id:'',
          nombre:'',
          monto:'',
          descripcion:'',
        },
      }
    },
    mounted(){
       this.config_error()
    },
    created(){
      this.obtener_tipo()
    },
    methods:{
        validar(){
        this.$validator.validateAll().then((result) =>{
                if(result){
                  this.guardar();
                }             
          });
        },
        obtener_tipo()
        {
            this.loader = true
            this.$store.state.services.tipoPagoService
                .editTipoPago(this.$route.params.id)
                .then(r=>{
                    this.loader = false
                    this.model.id = r.data.id
                    this.model.nombre = r.data.nombre
                    this.model.monto = r.data.monto
                    this.model.descripcion = r.data.descripcion
                })
                .catch(error=>{
                    this.loader = false
                })
        },
        guardar(){
            
          let datos = {
            'id':this.model.id,
            'nombre':this.model.nombre,
            'monto':this.model.monto,
            'descripcion':this.model.descripcion,
          }
          this.loader = true
          this.$store.state.services.tipoPagoService
                .updateTipoPago(datos)
                .then(r=>{
                    this.loader = false
                    toastr.success(this.$t('message_result_edit_success'),this.$t('message_title_global'))
                    this.$router.push({path:`/tipo-pago`})                    
                })
                .catch(error=>{
                   this.loader = false
                   if(error.response.data.code === 423){
                      toastr.error(error.response.data.error,this.$t('message_title_global'))
                   }
                   else
                   {
                      toastr.error(this.$t('message_result_error') + error,this.$t('message_title_global')) 
                   }
                })
        },
        cancelar(){
            this.$router.push({path:`/tipo-pago`})
        },
        config_error(){
            let self = this
               let dict = {
                custom:{
                  nombre:{
                      required:this.$t('global_validation_required',{field:'El nombre'}),
                  },
                  monto:{
                      required:this.$t('global_validation_required',{field:'El monto'}),
                      numeric:this.$t('global_validation_numeric',{field:'El monto'}),
                  },
                  descripcion:{
                      required:this.$t('global_validation_required',{field:'La descripción'}),
                  },
                }
               }

              self.$validator.localize('es',dict);
          },
    }
  }
</script>