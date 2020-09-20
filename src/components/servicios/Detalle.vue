<template>
    <v-container fluid>
        <loading v-if="loader"></loading>
        <v-row>
            <v-col md="8" offset="2">
                <v-card>
                    <v-toolbar dark color="grey lighten-4" dense>
                        <v-row align="center" justify="center">
                            <v-toolbar-title style="color:#000">{{ $t('miscelanius_detail_item') }}</v-toolbar-title>
                        </v-row>
                    </v-toolbar>
                    <v-card-text style="margin-top:10px">
                        <!--  -->

                        <v-list two-line>
                            <v-list-item>
                                <v-list-item-icon>
                                <v-icon color="indigo">account_box</v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                <v-list-item-title>{{ model.nombre }}</v-list-item-title>
                                <v-list-item-subtitle>Nombre del usuario</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>

                            <v-list-item>
                                <v-list-item-icon>
                                <v-icon color="indigo">credit_card</v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                <v-list-item-title>{{ model.dpi }}</v-list-item-title>
                                <v-list-item-subtitle>DPI</v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-icon>
                                <v-icon>mdi-message-text</v-icon>
                                </v-list-item-icon>
                            </v-list-item>

                            <v-divider inset></v-divider>

                            <v-list-item>
                                <v-list-item-icon>
                                <v-icon color="indigo">email</v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                <v-list-item-title>{{ model.correo_electronico }}</v-list-item-title>
                                <v-list-item-subtitle>Correo electrónico</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>

                            <v-list-item>
                                <v-list-item-icon>
                                <v-icon color="indigo">room</v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                <v-list-item-title>{{ model.sector }}</v-list-item-title>
                                <v-list-item-subtitle>Sector</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>

                            <v-divider inset></v-divider>

                            <v-list-item>
                                <v-list-item-icon>
                                <v-icon color="indigo">home</v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                <v-list-item-title>{{ model.direccion }}</v-list-item-title>
                                <v-list-item-subtitle>Dirección</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-icon>
                                <v-icon color="indigo">navigation</v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                <v-list-item-title>{{ model.referencia_direccion }}</v-list-item-title>
                                <v-list-item-subtitle>Referencia de la dirección</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            </v-list>
                        <!--  -->
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn color="grey darken-2" text @click="cancelar()">
                        {{ $t('miscelanius_cancel_item') }}
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
            correo_electronico:"",
            direccion:"",
            dpi:"",
            nombre:"",
            referencia_direccion:"",
            sector:"",
        },
      }
    },
    mounted(){
        this.obtener_servicio()
    },
    created(){
     
    },
    methods:{
       
        obtener_servicio(){
          
          this.loader = true
          this.$store.state.services.servicioService
                .detailServicio(this.$route.params.id)
                .then(r=>{
                    this.loader = false
                    this.model.correo_electronico = r.data.data.correo_electronico
                    this.model.direccion = r.data.data.direccion
                    this.model.dpi = r.data.data.dpi
                    this.model.nombre = r.data.data.nombre
                    this.model.referencia_direccion = r.data.data.referencia_direccion
                    this.model.sector = r.data.data.sector
                })
                .catch(error=>{
                   this.loader = false
                })
        },
        cancelar(){
            this.$router.push({path:`/servicios`})
        },
    }
  }
</script>