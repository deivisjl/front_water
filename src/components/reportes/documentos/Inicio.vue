<template>
  <div>
    <v-row>
      <v-col md="3" sm="3">
        <v-card>
        <v-toolbar dark color="primary">
            <v-row align="center" justify="center">
                <v-toolbar-title>{{ $t('miscelanius_title_report')}}</v-toolbar-title>
            </v-row>
        </v-toolbar>
          <v-list>
            <template v-for="(item, index) in items">
              <v-list-item
                v-if="item.accion"
                :key="item.titulo"
                @click="montar_componentes(item.no)"
              >
                <v-list-item-action>
                  <v-icon>{{ item.accion }}</v-icon>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title>{{ item.titulo }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-divider
                v-else-if="item.divider"
                :key="index"
              ></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-col>
      <v-col md="9" sm="9">
          <v-card style="border-top: 6px solid #1565c0; min-height:50vh">
              <v-card-text>
                    <v-row>
                      <v-col md="6" offset="3">
                          <reporte-servicio v-if="reporte_servicio"></reporte-servicio>
                          <reporte-solicitudes v-if="reporte_solicitudes"></reporte-solicitudes>
                          <reporte-morosos v-if="reporte_morosos"></reporte-morosos>
                          <reporte-recaudacion v-if="reporte_recaudacion"></reporte-recaudacion>
                      </v-col>
                    </v-row>
              </v-card-text>
          </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ReporteServicio from '@/components/reportes/documentos/ReporteServicio'
import ReporteSolicitudes from '@/components/reportes/documentos/ReporteSolicitudes'
import ReporteMorosos from '@/components/reportes/documentos/ReporteMorosos'
import ReporteRecaudacion from '@/components/reportes/documentos/ReporteRecaudacion'

  export default {
    data(){
        return {
            items: [
                { accion: 'archive', titulo: 'Reporte de servicios', no: 1},
                { divider: true,},
                { accion: 'archive', titulo: 'Reporte de solicitudes', no: 2},
                { divider: true },
                { accion: 'archive', titulo: 'Reporte de morosos', no: 3 },
                { divider: true },
                { accion: 'archive', titulo: 'Reporte de recaudación', no: 4 },
            ],
            reporte_servicio:true,
            reporte_solicitudes:false,
            reporte_morosos:false,
            reporte_recaudacion:false,
        }
    },
    components:{
        ReporteServicio,
        ReporteSolicitudes,
        ReporteMorosos,
        ReporteRecaudacion,
    },
    methods:{
        montar_componentes(no)
        {
            switch(no)
            {
                case 1:
                    this.reporte_servicio = true
                    this.reporte_solicitudes = false
                    this.reporte_morosos = false
                    this.reporte_recaudacion = false
                    break;
                case 2:
                    this.reporte_servicio = false
                    this.reporte_solicitudes = true
                    this.reporte_morosos = false
                    this.reporte_recaudacion = false
                    break;
                case 3:
                    this.reporte_servicio = false
                    this.reporte_solicitudes = false
                    this.reporte_morosos = true
                    this.reporte_recaudacion = false
                    break;
                case 4:
                    this.reporte_servicio = false
                    this.reporte_solicitudes = false
                    this.reporte_morosos = false
                    this.reporte_recaudacion = true
                    break;
            }
        }
    }
  }
</script>