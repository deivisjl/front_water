<template>
    <div></div>
</template>
<script>
import loading from "./shared/loading"

export default {
  name: 'Acceso',

  components:{
        loading
    },
  data: () => ({
    loader:false,
    model:{
      libros:[]
    }
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
