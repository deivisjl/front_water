<template>
    <div>
        <loading v-if="loader"></loading>
        <v-row>
            <v-col md="12">
                <h2 style="text-align:center">Reporte de morosos</h2>
            </v-col>
        </v-row>
        <v-form :autocomplete="'off'" ref="form" @submit.prevent="validar()">
            <v-menu
                ref="menu"
                v-model="menuFechaFin"
                :nudge-right="40"                                
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
            >
                <template v-slot:activator="{ on }">
                <v-text-field
                    :label="$t('miscelanius_date_to')"
                    outlined
                    dense
                    readonly
                    name="fecha_fin"
                    v-validate="'required'"
                    :value="desplegar_fecha_fin"
                    v-on="on"
                ></v-text-field>
                </template>
                <v-date-picker
                    locale="es-es"
                    v-model="valorFechaFin"
                    no-title
                    @input="menuFechaFin = false"
                >
                </v-date-picker>
            </v-menu>
            <form-error :attribute_name="'fecha_fin'" :errors_form="errors"> </form-error>

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

        menuFechaFin:false,
        valorFechaFin:null,
    }),
    components:{
        loading,
        FormError,
    },
    computed:{
        desplegar_fecha_fin(){
            return  moment(this.valorFechaFin).format('DD-MM-YYYY')
        },
    },
    created(){
        this.setear_fechas()
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
                'hasta':this.desplegar_fecha_fin
            }

            this.loader = true
            this.$store.state.services.reporteDocumentoService
              .generar_reporte_morosos(datos)
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
         setear_fechas()
        {
            this.valorFechaFin = moment().format('YYYY-MM-DD')
        },
     },
}
</script>
