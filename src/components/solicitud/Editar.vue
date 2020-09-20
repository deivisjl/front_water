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
                        <v-form :autocomplete="'off'" ref="form" @submit.prevent="validar()">
                            <v-autocomplete
                                v-validate="'required'" 
                                outlined
                                dense
                                name="usuario"
                                autofocus
                                v-model="model.usuario"
                                :items="usuarios"
                                :loading="isLoading"
                                :search-input.sync="buscar"  
                                clear-icon="clear"
                                @click:clear="limpiar"
                                :clearable="clear"
                                :value="model.usuario"
                                hide-selected                       
                                item-text='nombre'
                                label="Usuario"
                                return-object
                            ><template v-slot:no-data>
                                <v-list-item>
                                <v-list-item-title>
                                    Escribe para buscar un usuario
                                </v-list-item-title>
                                </v-list-item>
                            </template>
                            </v-autocomplete>
                            <form-error :attribute_name="'usuario'" :errors_form="errors"> </form-error>

                            <v-select outlined dense
                                v-validate="'required'" 
                                v-model="model.sector" 
                                item-value="id" 
                                name="sector" 
                                item-text="nombre" 
                                :items="sectores" label="Sector"></v-select>
                            <form-error :attribute_name="'sector'" :errors_form="errors"> </form-error>
                            <v-text-field outlined dense name="direccion" v-model="model.direccion" v-validate="'required'" label="Dirección"></v-text-field>

                            <form-error :attribute_name="'direccion'" :errors_form="errors"> </form-error>
                            <v-text-field
                                outlined
                                dense
                                name="referencia"
                                label="Referencia de dirección"
                                v-model="model.referencia"
                                ></v-text-field>
                            <form-error :attribute_name="'referencia'" :errors_form="errors"> </form-error>
                            <v-menu
                                v-model="fromDateMenu"
                                :close-on-content-click="false"
                                :nudge-right="40"                                
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="290px"
                                >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                    label="Fecha solicitud"
                                    outlined
                                    dense
                                    readonly
                                    name="fecha"
                                    v-validate="'required'"
                                    :value="fromDateDisp"
                                    v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    locale="es-es"
                                    v-model="fromDateVal"
                                    no-title
                                    @input="fromDateMenu = false"
                                ></v-date-picker>
                                </v-menu>
                                <form-error :attribute_name="'fecha'" :errors_form="errors"> </form-error>
                        </v-form>
                    </v-card-text>
                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-btn color="grey darken-2" text @click="cancelar()">
                        {{ $t('miscelanius_cancel_item') }}
                        </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="validar()">
                        {{ $t('miscelanius_edit_item') }}
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
        clear:true,
        loader:false,
        descriptionLimit: 60,
        usuarios: [],
        isLoading: null,
        model: null,
        buscar: null,
        sectores:[],
        fromDateMenu:false,
        fromDateVal:null,

        model:{
          id:'',
          usuario:'',
          sector:'',
          direccion:'',
          referencia:'',
        },
      }
    },
    mounted(){
        this.config_error()
        this.obtener_datos()        
    },
    created(){
     
    },
    computed:{
        fromDateDisp(){
            return this.fromDateVal
        }
    },
    watch:{
        buscar(val)
        {
            if(val && val.length > 2 && !this.model.usuario)
            {
                this.isLoading = true
                this.usuarios = []

                this.$store.state.services.usuariosService
                    .searchUsuario(val)
                    .then(r=>{                        
                        this.usuarios = r.data.data
                    })
                    .catch(error => {
                        toastr.error(this.$t('message_result_error') + error,this.$t('message_title_global'))
                    })
                    .finally(() =>{this.isLoading = false})
            }
        }
    },
    methods:{
        validar(){
        this.$validator.validateAll().then((result) =>{
                if(result){
                  this.guardar();
                }             
          });
        },
        limpiar()
        {
            this.model.usuario = ''
            this.usuarios =[]
        },
        obtener_datos()
        {
            this.obtener_sectores()
            this.loading = true
            this.obtener_registro()
                .then((resolve)=>{
                    this.obtener_usuario(resolve)
                     .then((resolve) =>{
                         this.loading = false
                     })
                     .catch((error)=>{

                     })
                })
                .catch((error)=>{
                    this.loading = false
                })
        },
        obtener_registro()
        {
            return new Promise((resolve, reject)=>{

                this.$store.state.services.solicitudService
                    .editSolicitud(this.$route.params.id)
                    .then(r=>{
                        this.model.id = r.data.id
                        this.model.sector = r.data.sector_id
                        this.fromDateVal = r.data.fecha_solicitud
                        this.model.direccion = r.data.direccion
                        this.model.referencia = r.data.referencia_direccion

                        resolve(r.data.usuario_id)
                    })
                    .catch(error=>{
                        resolve(error)
                    })
            })
        },
        obtener_usuario(id)
        {
            return new Promise((resolve,reject)=>{

                this.$store.state.services.usuariosService
                    .getUsuario(id)
                    .then(r=>{
                        this.model.usuario = r.data.data
                        resolve()
                    })
                    .catch(error=>{
                        resolve(error)
                    })
            })
        },
        obtener_sectores()
        {
            this.$store.state.services.sectorService
                .getSectores()
                .then(r=>{
                    this.sectores = r.data
                })
                .catch(error=>{})       
        },
        guardar(){
          let datos = {
            'id':this.model.id,
            'usuario_id':this.model.usuario.id,
            'sector_id':this.model.sector,
            'direccion':this.model.direccion,
            'referencia':this.model.referencia,
            'fecha':this.fromDateDisp,
          }
          
          this.loader = true
          this.$store.state.services.solicitudService
                .updateSolicitud(datos)
                .then(r=>{
                    this.loader = false
                    toastr.success(this.$t('message_result_success'),this.$t('message_title_global'))
                    this.$router.push({path:`/solicitudes`})                    
                })
                .catch(error=>{
                   this.loader = false
                   toastr.error(this.$t('message_result_error') + error,this.$t('message_title_global'))
                })
        },
        cancelar(){
            this.$router.push({path:`/solicitudes`})
        },
        config_error(){
            let self = this
               let dict = {
                custom:{
                    usuario:{
                        required:this.$t('global_validation_required',{field:'El usuario'}),
                    },
                    sector:{
                        required:this.$t('global_validation_required',{field:'El sector'}),
                    },
                    direccion:{
                        required:this.$t('global_validation_required',{field:'La dirección'}),
                    },
                    referencia:{
                        required:this.$t('global_validation_required',{field:'La referencia'}),
                    }
                }
               }

              self.$validator.localize('es',dict);
          },
    }
  }
</script>