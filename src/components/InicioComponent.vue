<template>
  <v-container fluid>
      <v-row class="text-center">
        <v-col md="6" offset="3">
          <loading v-if="loader"></loading>
          <v-card>
              <v-card-text>
                  <h2 style="font-weight:bold;">Sistema de Control de Usuarios del Agua Potable</h2>
                  <img alt="Vue logo" src="../assets/logo-oficial.png" style="height: 350px; display:block; margin: 0 auto;">
              </v-card-text>
          </v-card>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
import loading from "./shared/loading"

export default {
  name: 'Inicio',

  components:{
        loading
    },
  data: () => ({
    loader:false,
  }),
  created(){
    //this.obtener_usuario()
  },
  methods:{
    obtener_usuario(){
      this.loader = true
      this.model.libros=[]
       this.$store.state.services.loginService
        .getMenu()
        .then(r=>{
            this.loader = false
            console.log(r.data)
        })
        .catch(error => {
          this.loader = false
        })
    }
  }
}
</script>
