<template>
  <div class="text-center">
    <loading v-if="loader"></loading>
    <v-dialog
      v-model="dialog"
      width="500"
      persistent
    >
      <v-card>
        <v-toolbar dark color="primary" dense>
            <v-row align="center" justify="center">
                <v-toolbar-title>{{ $t('miscelanius_edit_title_item') }}</v-toolbar-title>
            </v-row>
        </v-toolbar>

        <v-card-text style="margin-top:10px">
          <v-form ref="form" lazy-validation>

                <v-text-field outlined dense autofocus name="titulo" v-model="model.titulo"  label="Título" v-validate="'required'"></v-text-field>
                <form-error :attribute_name="'titulo'" :errors_form="errors"> </form-error>

                <v-text-field outlined dense v-model="model.ruta" name="ruta" label="Nombre de la ruta" v-validate="'required'"></v-text-field>
                <form-error :attribute_name="'ruta'" :errors_form="errors"> </form-error>

                <v-text-field 
                    outlined dense
                    v-model="model.icono" 
                    label="Icono" 
                    :append-icon="model.icono" name="icono" v-validate="'required'"></v-text-field>
                <form-error :attribute_name="'icono'" :errors_form="errors"> </form-error>

                <v-select outlined dense v-model="model.padre" item-value="id" item-text="titulo" :items="items" label="Permiso padre"></v-select>

                <v-text-field outlined dense v-model="model.orden" name="orden" label="Orden de despligue" v-validate="'required|numeric'"></v-text-field>
                <form-error :attribute_name="'orden'" :errors_form="errors"> </form-error>

                <v-text-field outlined dense v-model="model.descripcion" name="descripcion" label="Descripción" v-validate="'required'"></v-text-field>
                <form-error :attribute_name="'descripcion'" :errors_form="errors"> </form-error>

                <v-checkbox v-model="model.visible" label="Visible"></v-checkbox>
            </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
            <v-btn color="grey darken-2" text @click="cancelar()">
              {{ $t('miscelanius_cancel_item') }}
            </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="validar()">
            {{ $t('miscelanius_update_item') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import loading from "../../shared/loading"
import FormError from "@/components/shared/FormError"

  export default {
    components:{
        loading,
        FormError
    },
    props: {
        	detalle: Object
      	},
    data () {
      return {
        dialog: true,
        checkbox: true,
        items:[],
        padres:[],
        loader:false,

        model:{
          id:'',
          titulo:'',
          ruta:'',
          icono:'minimize',
          padre:{},
          descripcion:'',
          visible:true,
          orden:''
        },
        valid:{},
      }
    },
    mounted(){
      this.config_error()
    },
    created(){
      this.model.id = this.detalle.id
      this.model.titulo = this.detalle.titulo
      this.model.ruta = this.detalle.ruta_cliente
      this.model.icono = this.detalle.icono
      this.model.padre = this.detalle.menu_titulo_id
      this.model.descripcion = this.detalle.descripcion
      this.model.visible = (this.detalle.visibilidad == 'visible') ? true : false
      this.model.orden = this.detalle.orden

      this.obtener_padres()
    },
    methods:{
      validar(){
        this.$validator.validateAll().then((result) =>{
                if(result){
                  this.actualizar();
                }             
          });
        },
        obtener_padres()
        {
            this.$store.state.services.permisoService
                .getPadres()
                .then(r=>{
                    this.items = r.data
                })
                .catch(error=>{

                })
        },
        actualizar(){
          
          let datos = {
            'id':this.model.id,
            'titulo':this.model.titulo,
            'ruta':this.model.ruta,
            'icono':this.model.icono,
            'padre':this.model.padre,
            'descripcion':this.model.descripcion,
            'visible':this.model.visible,
            'orden':this.model.orden,
          }
            this.loader = true
          this.$store.state.services.permisoService
                .updatePermiso(datos)
                .then(r=>{
                    this.loader = false
                    toastr.success(this.$t('message_result_edit_success'),this.$t('message_title_global'))
                    events.$emit('postEditarRegistro',true)
                })
                .catch(error=>{
                    this.loader = false   
                    
                    if(error.response.data.code === 423){
                        toastr.error(this.$t('message_result_error') + error.response.data.error,this.$t('message_title_global'))     
                    }
                    else{
                        toastr.error(this.$t('message_result_error') + error,this.$t('message_title_global'))
                    }
                })
        },
        cancelar(){
            events.$emit('postEditarRegistro',false)
        },
        config_error(){
            let self = this
               let dict = {
                custom:{
                  titulo:{
                      required:this.$t('global_validation_required',{field:'El título'}),
                  },
                  ruta:{
                      required:this.$t('global_validation_required',{field:'La ruta'}),
                  },
                  icono:{
                      required:this.$t('global_validation_required',{field:'El nombre del icono'}),
                  },
                  orden:{
                      required:this.$t('global_validation_required',{field:'El orden'}),
                      numeric:this.$t('global_validation_numeric',{field:'El orden'}),
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