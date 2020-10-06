<template>
    <v-container fluid>
        <loading v-if="loader"></loading>
        <v-row>
            <v-col md="4">
                <v-menu
                        ref="menu"
                        v-model="menuFechaInicio"
                        :close-on-content-click="false"
                        :nudge-right="40"                                
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                        <v-text-field
                            :label="$t('miscelanius_date_from')"
                            outlined
                            dense
                            readonly
                            name="fecha_inicio"
                            v-validate="'required'"
                            :value="desplegar_fecha_inicio"
                            v-on="on"
                        ></v-text-field>
                        </template>
                        <v-date-picker
                            locale="es-es"
                            v-model="valorFechaInicio"
                            no-title
                            @input="menuFechaInicio = false"
                        >
                        </v-date-picker>
                    </v-menu>
            </v-col>
            <v-col md="4">
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
            </v-col>
            <v-col md="4">
                <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    max-width="100px"
                    min-width="100px"
                    @click="dibujar_grafica()"
                >{{ $t('menu_title_visualice') }}</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col md="12">
                <GChart
                    type="PieChart"
                    :data="chartData"
                    :options="chartOptions"
                    style="width: auto; height: 350px;"
                    /> 
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import moment from 'moment';
import { GChart } from "vue-google-charts";
import loading from "@/components/shared/loading";

  export default {
    data: () => ({      
      menuFechaInicio:false,
      valorFechaInicio:null,

      menuFechaFin:false,
      valorFechaFin:null,

      loader:false,
      /*  */
      /*  */
      chartData: [],
      chartOptions: {}
      /*  */
    }),
    components: {
        GChart,
        loading,
    },
    mounted()
    {
        
    },
    created(){
        this.setear_fechas()
        this.dibujar_grafica()
    },
    computed:{
        desplegar_fecha_fin(){
            return  moment(this.valorFechaFin).format('DD-MM-YYYY')
        },

        desplegar_fecha_inicio(){
            return  moment(this.valorFechaInicio).format('DD-MM-YYYY')
        }
    },
    methods:{
        setear_fechas()
        {
            this.valorFechaInicio = moment().subtract(6, 'months').format('YYYY-MM-DD');

            this.valorFechaFin = moment().format('YYYY-MM-DD')
        },

         dibujar_grafica()
        {

            this.loader = true

            let datos = {
                'desde': this.desplegar_fecha_inicio,
                'hasta':this.desplegar_fecha_fin
            }

            this.$store.state.services.reporteService
                    .grafica_solicitud(datos)
                    .then((r) => {
                        if(r.data.data.length >= 1)
                        {
                            this.chartOptions = {
                                legend: 'none',
                                is3D: true,
                            }

                            this.chartData = r.data.data
                        }                        

                    })
                    .catch((error)=>{
                        toastr.error(error.response.data.error,this.$t('message_title_global'))
                    })
                    .finally(()=>{
                        this.loader = false
                    })
        }
    }
  }
</script>