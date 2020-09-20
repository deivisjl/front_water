<template>
    <v-container fluid>
        <loading v-if="loader"></loading>
        <v-row>
            <v-col md="8" offset="2">
                <v-card>
                    <v-toolbar dark color="grey lighten-4" dense>
                        <v-row align="center" justify="center">
                            <v-toolbar-title style="color:#000">{{ $t('miscelanius_new_item') }}</v-toolbar-title>
                        </v-row>
                    </v-toolbar>
                    <v-card-text style="margin-top:10px">
                        <v-form :autocomplete="'off'" ref="form" lazy-validation>

                            <v-text-field outlined dense autofocus name="nombre" v-model="model.nombre" v-validate="'required'" label="Nombres"></v-text-field>
                            <form-error :attribute_name="'nombre'" :errors_form="errors"> </form-error>

                            <v-text-field outlined dense name="apellido" v-model="model.apellido" v-validate="'required'" label="Apellidos"></v-text-field>
                            <form-error :attribute_name="'apellido'" :errors_form="errors"> </form-error>

                            <v-text-field outlined dense name="puesto" v-model="model.puesto" v-validate="'required'" label="Puesto"></v-text-field>
                            <form-error :attribute_name="'puesto'" :errors_form="errors"> </form-error>
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
          nombre:'',
          apellido:'',
          puesto:'',
        },
      }
    },
    mounted(){
        this.config_error()
    },
    created(){
     
    },
    methods:{
        validar(){
        this.$validator.validateAll().then((result) =>{
                if(result){
                  this.guardar();
                }             
          });
        },
        guardar(){
          let datos = {
            'nombres':this.model.nombre,
            'apellidos':this.model.apellido,
            'puesto':this.model.puesto,
          }
          this.loader = true
          this.$store.state.services.comiteService
                .saveComite(datos)
                .then(r=>{
                    this.loader = false
                    toastr.success(this.$t('message_result_success'),this.$t('message_title_global'))
                    this.$router.push({path:`/comite`})                    
                })
                .catch(error=>{
                   this.loader = false
                   toastr.error(this.$t('message_result_error') + error,this.$t('message_title_global'))
                })
        },
        cancelar(){
            this.$router.push({path:`/comite`})
        },
        config_error(){
            let self = this
               let dict = {
                custom:{
                  nombre:{
                      required:this.$t('global_validation_required',{field:'El nombre'}),
                  },
                  apellido:{
                      required:this.$t('global_validation_required',{field:'El apellido'}),
                  },
                  puesto:{
                      required:this.$t('global_validation_required',{field:'El puesto'}),
                  },
                }
               }

              self.$validator.localize('es',dict);
          },
    }
  }
</script>