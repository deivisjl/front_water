<template>
	<v-app id="inspire">
		<!-- <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
			<v-list dense>
				<template>
					<v-list-item :to="{name:'home'}">
						<v-list-item-action>
							<v-icon>home</v-icon>
						</v-list-item-action>
						<v-list-item-title>Inicio</v-list-item-title>
					</v-list-item>
				</template>
				<template>
					<v-list-group>
						<v-list-item slot="activator">
							<v-list-item-content>
								<v-list-item-title>Almacén</v-list-item-title>
							</v-list-item-content>
							<v-list-item-action>
								<v-icon>contacts</v-icon>
							</v-list-item-action>
						</v-list-item>
						<v-list-item :to="{name:''}">
							<v-list-item-action>
								<v-icon>panorama_fish_eye</v-icon>
							</v-list-item-action>
							<v-list-item-title>
								Categorías
							</v-list-item-title>
						</v-list-item>
					</v-list-group>
				</template>
			</v-list>
		</v-navigation-drawer> -->
		<v-navigation-drawer
        v-model="drawer"
		:clipped="$vuetify.breakpoint.lgAndUp" app
        :expand-on-hover="expandOnHover"
        :mini-variant="miniVariant"
        :right="right"
        :permanent="permanent"        
        absolute
      >
        <v-list
          dense
          nav
          class="py-0"
        >
          <v-list-item two-line :class="miniVariant && 'px-0'">
            <v-list-item-avatar>
              <img src="https://randomuser.me/api/portraits/men/81.jpg">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Application</v-list-item-title>
              <v-list-item-subtitle>Subtext</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

		<v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title style="width: 300px" class="ml-0 pl-4">
				<span class="hidden-sm-and-down">SISCAP</span>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon>
				<v-icon>apps</v-icon>
			</v-btn>
		</v-app-bar>
		<v-main>
			<v-container class="fill-height" fluid>
				<v-row align="center" justify="center">
					<v-tooltip right>
						<template>
							<router-view></router-view>
						</template>
					</v-tooltip>
				</v-row>
			</v-container>
		</v-main>
		<template>
			<v-card height="auto">
				<v-footer absolute darken color="primary">
					<v-col class="text-center white--text pt-0" cols="12">
						siscapIT &copy;{{ new Date().getFullYear() }}
					</v-col>
				</v-footer>
			</v-card>
		</template>
	</v-app>
</template>
<script>
export default {
	props: {
		source: String
	},
	data: () => ({
		dialog: false,
		drawer: null,
		 items: [
          { title: 'Dashboard', icon: 'dashboard' },
          { title: 'Photos', icon: 'mdi-image' },
          { title: 'About', icon: 'mdi-help-box' },
        ]
	})
};
</script>
