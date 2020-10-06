<template>
    <v-container fluid>
        <loading v-if="loader"></loading>
        <v-row>
            <v-col md="8" offset="2">
                <v-card>
                    <v-toolbar dark color="grey lighten-4" dense>
                        <v-row align="center" justify="center">
                            <v-toolbar-title style="color:#000">{{ $t('miscelanius_payment_item') }}</v-toolbar-title>
                        </v-row>
                    </v-toolbar>
                    <v-card-text style="margin-top:10px">
                        <!-- Card del usuario -->
                        <v-alert
                            :v-model="true"
                            color="green"
                            border="left"
                            elevation="2"
                            colored-border
                            style="text-align:center">
                                <h3>Titular: <span class="blue--text">{{ usuario.nombre }}</span>  No convenio: <span class="blue--text">{{ usuario.convenio }}</span></h3>
                            </v-alert>
                        <!-- end Card del usuario -->
                        <v-form :autocomplete="'off'" ref="form" lazy-validation>

                            <v-select outlined dense v-model="model.tipo_pago" item-value="id" name="tipo_pago" v-validate="'required'" item-text="nombre" :items="tipos_pagos" label="Tipo de pago" @change="verificar()"></v-select>
                            <form-error :attribute_name="'tipo_pago'" :errors_form="errors"> </form-error>

                            <v-select outlined dense v-model="model.mes" item-value="id" name="mes" v-validate="'required'" item-text="nombre" :items="meses" label="Mes de pago" v-if="mostrar_mes"></v-select>
                            <form-error :attribute_name="'mes'" :errors_form="errors"> </form-error>

                            <v-select outlined dense v-model="model.anio" item-value="id" name="anio" v-validate="'required'" item-text="nombre" :items="anios" label="Año"></v-select>
                            <form-error :attribute_name="'anio'" :errors_form="errors"> </form-error>

                            <v-text-field outlined dense name="monto" v-model="model.monto" v-validate="'required'" label="Monto" v-on:keyup.enter="validar()"></v-text-field>
                            <form-error :attribute_name="'monto'" :errors_form="errors"> </form-error>
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
        tipos_pagos:[],
        meses:[],
        anios:[],
        mostrar_mes:true,
        usuario:{
            nombre:'',
            servicio:'',
            convenio:'',
        },

        model:{
          tipo_pago:'',
          servicio:'',
          mes:'',
          anio:'',
          monto:'',
        },
      }
    },
    mounted(){
        this.config_error()
        this.obtener_datos()
    },
    created(){
     
    },
    methods:{
        verificar()
        {
            this.tipos_pagos.forEach(data =>{
                if(data.id == this.model.tipo_pago)
                {
                    this.model.monto = data.monto

                    if(data.unico ===  1)
                    {
                        this.mostrar_mes = false
                        this.model.mes = ''
                    }
                    else
                    {
                        this.mostrar_mes = true
                    }
                }
            })
        },
        validar(){
        this.$validator.validateAll().then((result) =>{
                if(result){
                  this.guardar();
                }             
          });
        },
        guardar(){
          let datos = {
            'usuario':this.$route.params.id,
            'anio':this.model.anio,
            'mes':this.model.mes,
            'monto':this.model.monto,
            'servicio':this.usuario.servicio,
            'tipo_pago':this.model.tipo_pago
          }

          this.loader = true

          this.$store.state.services.pagoService
                .savePago(datos)
                .then(r=>{
                    this.loader = false

                    const blob = new Blob([r.data], {type: r.data.type});
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    let fileName = Date.now()+'.pdf';
                    link.setAttribute('download', fileName);
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    window.URL.revokeObjectURL(url);

                    toastr.success(this.$t('message_result_success'),this.$t('message_title_global'))
                    this.$router.push({path:`/pagos`})                    
                })
                .catch(error=>{
                   this.loader = false
                   
                   if(error.response.data.code == 423)
                   {
                       toastr.error(error.response.data.error,this.$t('message_title_global'))
                   }
                   else
                   {
                       toastr.error(this.$t('message_result_error') + error,this.$t('message_title_global'))
                   }
                })
        },
        obtener_datos()
        {
            this.loader = true

            Promise.all([this.obtener_tipos(),this.obtener_usuario(),this.obtener_anios(),this.obtener_meses()])
                .then(resolve =>{

                })
                .catch(error => {
                    toastr.error(this.$t('message_result_error') + error,this.$t('message_title_global'))
                })
                .finally(() =>{
                    this.loader = false
                })
        },
        
        obtener_meses()
        {
            return new Promise((resolve, reject)=>{
                this.$store.state.services.mesService
                    .getMeses()
                    .then(r=>{
                        this.meses = r.data
                        resolve()
                    })
                    .catch(error =>{
                        reject(error)
                    })
            })
        },
        obtener_anios()
        {
            return new Promise((resolve, reject)=>{
                this.$store.state.services.anioService
                    .getAnios()
                    .then(r=>{
                        this.anios = r.data
                        resolve()
                    })
                    .catch(error =>{
                        reject(error)
                    })
            })
        },
        obtener_usuario()
        {
            return new Promise((resolve, reject)=>{
                this.$store.state.services.servicioService
                    .getTitularServicio(this.$route.params.id)
                    .then(r=>{
                        this.usuario.nombre = r.data.data.nombre
                        this.usuario.convenio = r.data.data.no_convenio
                        this.usuario.servicio = r.data.data.id
                        resolve()
                    })
                    .catch(error =>{
                        reject(error)
                    })
            })
        },
        obtener_tipos()
        {
            return new Promise((resolve, reject)=>{
                this.$store.state.services.tipoPagoService
                    .obtenerTipoPago()
                    .then(r=>{
                        this.tipos_pagos = r.data
                        resolve()
                    })
                    .catch(error =>{
                        reject(error)
                    })
            })
        },
        cancelar(){
            this.$router.push({path:`/pagos`})
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
                  },
                  mes:{
                      required:this.$t('global_validation_required',{field:'El mes'}),
                  },
                  anio:{
                      required:this.$t('global_validation_required',{field:'El año'}),
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