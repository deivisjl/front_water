<template>
	<v-app id="inspire">
    <!-- sidebar -->
    <v-navigation-drawer
        v-model="drawer"
		    :clipped="$vuetify.breakpoint.lgAndUp" app
        :expand-on-hover="expandOnHover"
        :mini-variant="miniVariant"
        :right="right"
        :permanent="permanent"
        v-if="isloggedin"
      >
        <v-list
          dense
          nav
          class="py-0"
        >
          <v-list dense>
        <template v-for="item in menu">
          <v-list-group
            v-if="item.subgrupo"
            :key="item.titulo"
            :prepend-icon="item.icono"
            :append-icon="item.subgrupo.size > 0 ? item.icono : icon"
            color="primary"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.titulo }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(child, i) in item.subgrupo"
              :key="i"
              :to="child.ruta_cliente"
              link
            >
              <v-list-item-action>
                <v-icon>{{ child.icono }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.titulo }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-else
            :key="item.titulo"
            link
          >
            <v-list-item-action>
              <v-icon>{{ item.icono }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.titulo }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
        </v-list>
      </v-navigation-drawer>
		<!--  -->

		<v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark >
			<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title style="width: 300px" class="ml-0 pl-4">
				<span class="hidden-sm-and-down">SISCAP</span>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<!-- <v-btn icon>
				<v-icon>apps</v-icon>
			</v-btn> -->
      <!--  -->
        
        <v-menu bottom offset-y v-if="isloggedin">
          <template v-slot:activator="{on}">
            <v-btn icon v-on="on" dark>
              <v-list-item-avatar>
                <img src="https://randomuser.me/api/portraits/men/81.jpg">
              </v-list-item-avatar>
            </v-btn>
          </template>
          <v-list dense>
              <v-list-item offset-x class="avatar" @click="logout()">
                  <v-list-item-action>
                      <v-icon>power_settings_new</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                      <v-list-item>
                        <v-list-item-title>{{ $t('menu_title_logout') }}</v-list-item-title>
                    </v-list-item>
                  </v-list-item-content>
              </v-list-item>
            </v-list>
        </v-menu>
        
      <!--  -->
		</v-app-bar>
		<v-main style="background-color: rgb(226, 234, 245);">
			<v-container fluid>
				<v-row align="center" justify="center" :style="{background:$vuetify.theme.themes.light.background}">
					<v-col cols="12" md="12">
              <router-view></router-view>
          </v-col>
				</v-row>
			</v-container>
		</v-main>
		<template>
			<v-card v-if="isloggedin">
				<v-footer darken color="primary">
					<v-col class="text-center white--text pt-0" cols="12">
						siscapIT &copy;{{ new Date().getFullYear() }}
					</v-col>
				</v-footer>
			</v-card>
		</template>
	</v-app>
</template>
<script>

import menu from '@/plugins/utils'

export default {
	props: {
		source: String
  },
  components:{
    
  },
  mounted(){
    this.reload = true
    this.event_obtener_menu(true)
  },  
  created(){
    events.$on('obtener_menu', this.event_obtener_menu)
    events.$on('eliminar_menu', this.event_eliminar_menu)
     this.menu = this.$store.state.services.loginService.getStorageMenu()
  },
  beforeDestroy() {
    events.$off('obtener_menu', this.event_obtener_menu)
    events.$on('eliminar_menu', this.event_eliminar_menu)
  },
	data: () => ({
		dialog: false,
    drawer: null,
    reload: false,
    menu:[],
    icon: 'keyboard_arrow_up','icon-alt': 'keyboard_arrow_down',
    right: false,
    permanent: false,
    miniVariant: false,
    expandOnHover: false,
    background: false,
  }),
  methods:{
    event_obtener_menu(data){
      !this.reload ? this.setear_menu() : this.setear_menu()
    },
    event_eliminar_menu(data){
      this.menu = []
      this.$store.dispatch("setMenu",[])
    },
    setear_menu(){
        menu.construir_menu()
        menu.construir_permisos()

        this.menu = this.$store.state.menu
        this.reload = false
    },
    logout(){
       this.$store.state.services.loginService.logout()
       this.$router.push('login')
    },
  },

  computed:{
      isloggedin: function(){
        return !_.isEmpty(this.$store.state.menu) ? true : false
      }
  },
};
</script>
<style>
  .v-avatar{
    border: 1.7px solid #fff;
  }
  .container--fluid {    
    padding: 10px 25px !important;
  }
  .main-card{
    min-height: 80vh;
  }
  .v-list-item:hover{
    background: #f1f1e2;
    cursor: pointer;
  }
  .avatar > .v-list-item__action{
    margin-right: 0!important;
  }
  .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th,
  .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
      border: thin solid rgba(0, 0, 0, 0.08);
      /* border: .8px solid #ddd; */
  }

  .v-data-table__wrapper {
      margin-left: 10px;
      margin-right: 10px;
  }
  .swal2-title {
    font-size: 1.3rem!important;
  }
</style>  
