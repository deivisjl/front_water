<template>
    <div>
        <h1>Hello world from Rol</h1>
    </div>
</template>
<script>
import loading from "../shared/loading"

export default {
  name: 'Rol',

  components:{
        loading
    },
  data: () => ({
    loader:false,
    model:{
      libros:[]
    }
  }),
  mounted(){
    
  },
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
