<template>
    <div>
        <loading v-if="loader"></loading>
        <v-row>
            <v-col md="12">
                <h2 style="text-align:center">Reporte de servicios</h2>
            </v-col>
        </v-row>
        <v-form :autocomplete="'off'" ref="form" @submit.prevent="validar()">
            <v-select outlined dense
                v-validate="'required'" 
                v-model="modelo.estado" 
                item-value="id" 
                name="estado" 
                item-text="nombre" 
                :items="estados" label="Estado"></v-select>
            <form-error :attribute_name="'estado'" :errors_form="errors"> </form-error>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="validar()">
                    {{ $t('miscelanius_generate_item') }}
                </v-btn>
            </v-card-actions>
        </v-form>
    </div>    
</template>
<script>
import moment from 'moment'
import loading from "@/components/shared/loading"
import FormError from "@/components/shared/FormError"

export default {
    data: () =>({
        loader:false,

        estados:[],

        modelo:{
            estado:'',
        },
    }),
    components:{
        loading,
        FormError,
    },
    computed:{
        
    },
    created(){
        this.obtener_estados()
    },
     methods:{
         validar(){
            this.$validator.validateAll().then((result) =>{
                if(result){
                    this.generar_reporte()
                }             
          });
        },
        generar_reporte(){

            let datos = {
                'hasta':this.desplegar_fecha_fin,
                'estado':this.modelo.estado
            }

            this.loader = true
            this.$store.state.services.reporteDocumentoService
              .generar_reporte_servicio(datos)
              .then((r)=>{
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
         obtener_estados()
         {
             this.loader = true
              this.$store.state.services.reporteDocumentoService
                    .obtener_estados()
                    .then((r) => {                        
                        this.estados = r.data
                    })
                    .catch((error)=>{
                        toastr.error(error.response.data.error,this.$t('message_title_global'))
                    })
                    .finally(()=>{
                        this.loader = false
                    })
         },
     },
}
</script>
