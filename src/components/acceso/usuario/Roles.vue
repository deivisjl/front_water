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
                        <v-list-item-group dense class="py-0">
                            <v-list-item v-for="(item,i) in items" :key="i" style="padding: 1 16px" dense>
                                <v-list-item-content style="padding: 1px">
                                <v-checkbox 
                                            v-model="opc"
                                            :checked="item.checked"
                                            :value="item.id"
                                            :label="descripcion(item)">
                                        </v-checkbox>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-btn color="grey darken-2" text @click="cancelar()">
                        {{ $t('miscelanius_cancel_item') }}
                        </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="guardar()">
                        {{ $t('miscelanius_update_item') }}
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import loading from "../../shared/loading"

  export default {
    components:{
        loading
    },
    data () {
      return {
        dialog: true,
        loader:false,
        checkbox:true,

        model:{
          id:'',
          roles:[]
        },
        items:[],
        opc:[]
      }
    },
    mounted(){
      
    },
    created(){
      this.obtener_roles_usuario()
    },
    methods:{
        descripcion(item){
            return (item.nombre+' ('+ item.descripcion +')')
        },
        obtener_roles_usuario()
        {
            this.loader = true
            this.model.id = this.$route.params.id

            this.$store.state.services.usuarioService
                .editRoles(this.$route.params.id)
                .then(r=>{
                    this.loader = false
                    this.model.roles = r.data
                    this.obtener_roles()
                })
                .catch(error=>{
                    this.loader = false
                })
        },
        obtener_roles(){
            this.loader = true
            this.$store.state.services.rolService
                .getAllRoles()
                .then(r=>{
                    this.loader = false
                    let roles = this.agregar_check(r.data)
                    this.items = this.verificar_check(roles)
                })
                .catch(error=>{
                    this.loader = false
                })
        },
        agregar_check(data){
            this.model.roles.forEach(function(item){
		    	item.checked = false
            })
            
            return data
        },

        verificar_check(data){
            let habilitado = this.model.roles
            
            for (let index = 0; index < data.length; index++) {
                for (let indice = 0; indice < habilitado.length; indice++) {
                    if(habilitado[indice].rol_id === data[index].id)
                    {
                        data[index].checked = true
                        this.opc.push(data[index].id)
                    }
                }
            }

		    return data
        },
        guardar(){
            
          let datos = {
            'id':this.model.id,
            'roles':this.opc
          }
          this.loader = true
          this.$store.state.services.usuarioService
                .updateRoles(datos)
                .then(r=>{
                    this.loader = false
                    toastr.success(this.$t('message_result_edit_success'),this.$t('message_title_global'))
                    this.$router.push({path:`/usuarios`})                    
                })
                .catch(error=>{
                   this.loader = false
                   toastr.error(this.$t('message_result_error') + error,this.$t('message_title_global'))
                })
        },
        cancelar(){
            this.$router.push({path:`/usuarios`})
        }
    }
  }
</script>