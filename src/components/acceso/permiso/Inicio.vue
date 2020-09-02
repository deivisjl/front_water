<template>
    <div class="text-center">
    <loading v-if="loader"></loading>
        <v-container fluid>
        <v-data-table
                :page="page"
                :options.sync="options"
                :server-items-length="totalRegistros"
                :footer-props="{
                  'items-per-page-options': [5, 10, 15, 20], 
                  'items-per-page-text':$t('vuetify.dataFooter.itemsPerPageText'),
                  'page-text':$t('vuetify.dataFooter.pageText')
                }"
                :headers="cabeceras"
                :items="items"
                :single-select="singleSelect"
                v-model="selected"
                show-select
                class="elevation-1"
                fixed-header
                >
                <template v-slot:no-data>
                  <v-alert dense outlined :value="true" color="info" icon="warning">
                    No se encontraron registros.
                  </v-alert>
              </template>
              <template v-slot:no-results>
                  <v-alert dense outlined :value="true" color="info" icon="warning">
                    No se encontraron registros.
                  </v-alert>
              </template>
                <template v-slot:item.id="{ item }">
                  <span>{{ item.id }}</span>
                </template>
                <template v-slot:item.icono="{ item }">
                  <v-icon>{{ item.icono }}</v-icon>
                </template>
                <template v-slot:top>
                    <v-toolbar flat color="white">
                    <v-toolbar-title>Permisos</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center" outlined dense v-model="buscar" :label="$t('menu_title_search')" single-line hide-details v-on:keyup.enter="busqueda">
                        <v-icon slot="append">search</v-icon>
                    </v-text-field>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        @click="nuevo()"
                    >{{ $t('miscelanius_new_item')}}</v-btn>
                    </v-toolbar>
                    <!--  -->
                        <v-card
                            color="grey lighten-4"
                            flat
                            height="auto"
                            tile
                            style="margin-left: 10px;margin-right: 10px;"
                          >
                          <v-toolbar dense>
                            <v-tooltip top>
                                <template v-slot:activator="{ on, attrs }">
                                  <v-btn icon v-bind="attrs" v-on="on" @click="recargar">
                                    <v-avatar color="grey lighten-2" size="36">
                                      <v-icon color="grey darken-2">replay</v-icon>
                                    </v-avatar>
                                  </v-btn>
                                </template>
                                <span>{{ $t('miscelanius_reload_item') }}</span>
                              </v-tooltip>
                              <v-icon>more_vert</v-icon>
                              <v-tooltip top v-if="unitario">
                                <template v-slot:activator="{ on, attrs }">
                                  <v-btn icon v-bind="attrs" v-on="on" @click="editar_permiso(selected[0])">
                                    <v-avatar color="green" size="36">
                                      <v-icon color="white darken-2">edit</v-icon>
                                    </v-avatar>
                                  </v-btn>
                                </template>
                                <span>{{ $t('miscelanius_edit_item') }}</span>
                              </v-tooltip>
                              <v-icon v-if="unitario">more_vert</v-icon>
                              <v-tooltip top v-if="opciones">
                                <template v-slot:activator="{ on, attrs }">
                                  <v-btn icon v-bind="attrs" v-on="on"  @click="eliminar_permiso(selected[0])">
                                    <v-avatar color="red" size="36">
                                      <v-icon color="white darken-2">delete</v-icon>
                                    </v-avatar>
                                  </v-btn>
                                </template>
                                <span>{{ $t('miscelanius_delete_item') }}</span>
                              </v-tooltip>
                          </v-toolbar>
                        </v-card>
                    <!--  -->
                    
                </template>
                </v-data-table>
              </v-container>
              <nuevo-registro v-if="nuevo_registro"></nuevo-registro>
              <editar-registro v-if="editar_registro" :detalle=registro></editar-registro>
    </div>
</template>
<script>
import loading from "../../shared/loading"
import nuevoRegistro from "./Nuevo"
import editarRegistro from "./Editar"

export default {
  name: 'Permiso',

  components:{
        loading,
        nuevoRegistro,
        editarRegistro
    },
  data: () => ({    
    page: 1,//
    totalRegistros: 0,//
    pagination:[5,10,15],//
    sincronizar:true,//
    options: {},//

    loader:false,
    dialog: false,
    buscar:'',
    singleSelect: true,
    nuevo_registro:false,
    editar_registro:false,
    registro:{},
    selected:[],
    
    cabeceras:[
      { text: 'Nombre', value: 'titulo' },
      { text: 'Icono', value: 'icono' },
      { text: 'Descripción', value: 'descripcion' }
    ],
    items:[]
  }),
  mounted(){
    this.obtener_permisos()
  },

  watch: {
    options: {
      handler() {
        if(this.items.length > 0 && this.sincronizar)
        {
          this.obtener_permisos();
        }
      },
    },
    deep: true,
  },
  created(){
    events.$on("postNuevoRegistro", this.onEventRegistro)
    events.$on("postEditarRegistro", this.onEventRegistro)
  },

  beforeDestroy() {
    events.$off('postNuevoRegistro', self.onEventRegistro)
    events.$off("postEditarRegistro", this.onEventRegistro)
  },
  methods:{
    busqueda(){
      this.sincronizar = false
      this.obtener_permisos()
    },
    nuevo(){
       this.nuevo_registro = true
    },
    recargar(){
      this.sincronizar = false
      this.obtener_permisos()
      this.selected=[]
    },
    obtener_permisos(){
      this.loader = true
      const { sortBy, sortDesc, page, itemsPerPage } = this.options;
      
      let pageNumber = page - 1;

      let datos = {
          'perPage':itemsPerPage,
          'page':pageNumber === 0 ? 0 : (pageNumber + itemsPerPage - 1),
          'sortBy':sortBy,
          'sortDesc':sortDesc,
          'search':this.buscar
      }

       this.$store.state.services.permisoService
        .getPermisos(datos)
        .then(r=>{
            this.loader = false
            this.items = r.data.data
            this.sincronizar = true;
            this.totalRegistros = r.data.total;
        })
        .catch(error => {
          this.loader = false
        })
    },
    editar_permiso(data){
      if(data)
      {
        this.loader = true
        this.$store.state.services.permisoService
        .editPermiso(data.id)
        .then(r=>{
          this.loader = false
           this.editar_registro = true
            this.registro = r.data
        })
        .catch(error=>{
            this.loader = false
            toastr.error(this.$t('message_result_error') + error,this.$t('message_title_global'))
        })
      }
    },
    eliminar_permiso(data){
       this.$swal({
		          	  title: "¿Desea eliminar el registro?",
                  text: data.titulo,
                  icon: "warning",
                  showCancelButton: true,
                  reverseButtons: false
                })
                .then(result =>{
                    if(result.value)
                    {
                        this.loader = true
                        this.$store.state.services.permisoService
                          .deletePermiso(data.id)
                          .then(r=>{
                              this.loader = false
                              toastr.success(this.$t('message_result_delete_success'),this.$t('message_title_global'))
                              this.recargar()
                          })
                          .catch(error=>{
                              this.loader = false
                              if(error.response.data.code === 423 || error.response.data.code === 409){
                                  toastr.error(this.$t('message_result_error') + error.response.data.error,this.$t('message_title_global'))     
                              }
                              else{
                                  toastr.error(this.$t('message_result_error') + error,this.$t('message_title_global'))
                              }
                          })
                    }
                })
    },
    onEventRegistro(estado){
       this.nuevo_registro = false
       this.editar_registro = false
       
       if(estado){
          this.recargar()
       }
    }
  },
  computed:{
    opciones(){
      return this.selected.length > 0 ? true : false
    },

    unitario(){
       return (this.selected.length > 0  && this.selected.length < 2) ? true : false
    }
  }
}
</script>
