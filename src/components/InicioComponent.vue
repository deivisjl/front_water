<template>
  <v-container fluid>
      <v-row class="text-center">
        <v-col cols="12" md="6">
          <loading v-if="loader"></loading>
          <h1>Inicio</h1>
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
