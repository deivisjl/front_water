<template>
    <div class="text-center">
    <loading v-if="loader"></loading>
        <v-container fluid>
        <v-data-table
                :headers="cabeceras"
                :items="items"
                :search="buscar"
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
                    <v-toolbar-title>Usuarios</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center" outlined dense v-model="buscar" :label="$t('menu_title_search')" single-line hide-details>
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
                                  <v-btn icon v-bind="attrs" v-on="on" @click="editar_roles(selected[0])">
                                    <v-avatar color="primary" size="36">
                                      <v-icon color="white darken-2">lock</v-icon>
                                    </v-avatar>
                                  </v-btn>
                                </template>
                                <span>{{ $t('miscelanius_rol_item') }}</span>
                              </v-tooltip>
                              <v-icon v-if="unitario">more_vert</v-icon>
                              <v-tooltip top v-if="unitario">
                                <template v-slot:activator="{ on, attrs }">
                                  <v-btn icon v-bind="attrs" v-on="on" @click="editar_usuario(selected[0])">
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
                                  <v-btn icon v-bind="attrs" v-on="on"  @click="eliminar_usuario(selected[0])">
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
    </div>
</template>
<script>
import loading from "../../shared/loading"

export default {
  name: 'Usuario',

  components:{
        loading
    },
  data: () => ({
    loader:false,
    dialog: false,
    buscar:'',
    singleSelect: true,
    nuevo_registro:false,
    editar_registro:false,
    registro:{},
    selected:[],
    
    cabeceras:[
      { text: 'Nombre', value: 'name' },
      { text: 'Correo electrónico', value: 'email' }
    ],
    items:[]
  }),
  mounted(){
    
  },
  created(){    
    this.obtener_usuarios()
  },
  methods:{
    nuevo(){
       this.$router.push({path:`usuarios/nuevo`});
    },
    recargar(){
      this.obtener_usuarios()
      this.selected=[]
    },
    obtener_usuarios(){
      this.loader = true
       this.$store.state.services.usuarioService
        .getUsuarios()
        .then(r=>{
            this.loader = false
            this.items = r.data
        })
        .catch(error => {
          this.loader = false
        })
    },
    editar_roles(data){
        if(data)
        {
            this.$router.push({path:`usuarios/roles/`+data.id});
        }
    },
    editar_usuario(data){
      if(data)
      {
        this.$router.push({path:`usuarios/editar/`+data.id});
      }
    },
    eliminar_usuario(data){
       this.$swal({
		          title: "¿Desea eliminar el registro?",
                  text: data.name,
                  icon: "warning",
                  showCancelButton: true,
                  reverseButtons: true
                })
                .then(result =>{
                    if(result.value)
                    {
                        this.loader = true
                        this.$store.state.services.usuarioService
                          .deleteRol(data.id)
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
