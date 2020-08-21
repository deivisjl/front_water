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
                <v-toolbar-title>{{ $t('miscelanius_new_item') }}</v-toolbar-title>
            </v-row>
        </v-toolbar>

        <v-card-text style="margin-top:10px">
          <v-form :autocomplete="'off'" ref="form" lazy-validation>

                <v-text-field outlined dense autofocus v-model="model.titulo" 
                      name="titulo" label="Título" v-validate="'required'" 
                     ></v-text-field>
                <form-error :attribute_name="'titulo'" :errors_form="errors"> </form-error>

                <v-text-field outlined dense v-model="model.ruta" 
                  name="ruta" label="Nombre de la ruta" v-validate="'required'" 
                 ></v-text-field>
                  <form-error :attribute_name="'ruta'" :errors_form="errors"> </form-error>

                <v-text-field 
                    outlined dense
                    v-model="model.icono" 
                    label="Icono"
                    name="icono" 
                    :append-icon="model.icono" v-validate="'required'" 
                   ></v-text-field>
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
            {{ $t('miscelanius_save_item') }}
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
    data () {
      return {
        dialog: true,
        checkbox: true,
        items:[],
        padres:[],
        loader:false,

        model:{
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
      this.obtener_padres()
    },
    methods:{
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
        validar(){
        this.$validator.validateAll().then((result) =>{
                if(result){
                  this.guardar();
                }             
          });
        },
        guardar(){
          
          let datos = {
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
                .savePermiso(datos)
                .then(r=>{
                    this.loader = false
                    toastr.success(this.$t('message_result_success'),this.$t('message_title_global'))
                    events.$emit('postNuevoRegistro',true)
                })
                .catch(error=>{
                   this.loader = false
                   toastr.error(this.$t('message_result_error') + error,this.$t('message_title_global'))
                })
        },
        cancelar(){
            events.$emit('postNuevoRegistro',false)
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