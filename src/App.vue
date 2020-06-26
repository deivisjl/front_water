<template>
	<v-app id="inspire">
		<v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
			<v-list dense>
				<template>
					<v-list-item :to="{name:'home'}">
						<v-list-item-action>
							<v-icon>home</v-icon>
						</v-list-item-action>
						<v-list-item-title>Inicio</v-list-item-title>
					</v-list-item>
				</template>
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
			{ icon: "mdi-contacts", text: "Contacts" },
			{ icon: "mdi-history", text: "Frequently contacted" },
			{ icon: "mdi-content-copy", text: "Duplicates" },
			{
				icon: "mdi-chevron-up",
				"icon-alt": "mdi-chevron-down",
				text: "Labels",
				model: true,
				children: [{ icon: "mdi-plus", text: "Create label" }]
			},
			{
				icon: "mdi-chevron-up",
				"icon-alt": "mdi-chevron-down",
				text: "More",
				model: false,
				children: [
					{ text: "Import" },
					{ text: "Export" },
					{ text: "Print" },
					{ text: "Undo changes" },
					{ text: "Other contacts" }
				]
			},
			{ icon: "mdi-cog", text: "Settings" },
			{ icon: "mdi-message", text: "Send feedback" },
			{ icon: "mdi-help-circle", text: "Help" },
			{ icon: "mdi-cellphone-link", text: "App downloads" },
			{ icon: "mdi-keyboard", text: "Go to the old version" }
		]
	})
};
</script>
