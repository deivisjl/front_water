<template>
	<div class="text-center">
		<v-container fluid>
			<v-row>
				<v-col md="6">
					<v-card>
						<v-toolbar dark color="white" dense>
							<v-row align="center" justify="center">
								<v-toolbar-title style="color:#000">{{ $t('miscelanius_general_collection') }}</v-toolbar-title>
							</v-row>
						</v-toolbar>
						<v-card-text>
              <!-- grafico de recaudacion general -->
							<grafico-recaudacion></grafico-recaudacion>
						</v-card-text>
					</v-card>
				</v-col>
				<v-col md="6">
					<v-card>
						<v-toolbar dark color="white" dense>
							<v-row align="center" justify="center">
								<v-toolbar-title style="color:#000">{{ $t('miscelanius_services_request') }}</v-toolbar-title>
							</v-row>
						</v-toolbar>
						<v-card-text>
              <!-- grafico de recaudacion general -->
							<grafico-servicios></grafico-servicios>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
			<v-row>
				<v-col md="12">
					<v-card>
						<v-toolbar dark color="white" dense>
							<v-row align="center" justify="center">
								<v-toolbar-title style="color:#000">{{ $t('miscelanius_type_collection') }}</v-toolbar-title>
							</v-row>
						</v-toolbar>
						<v-card-text>
							<grafico-recaudacion-tipo></grafico-recaudacion-tipo>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>
<script>
import GraficoRecaudacion from "@/components/reportes/grafico/GraficoRecaudacion"
import GraficoServicios from "@/components/reportes/grafico/GraficoAprobacion"
import GraficoRecaudacionTipo from "@/components/reportes/grafico/GraficoRecaudacionTipo"

export default {
	name: "graficos",

	components: {
		GraficoRecaudacion,
		GraficoServicios,
		GraficoRecaudacionTipo,
	},
	data: () => ({
	}),
	mounted() {},
	created() {},

	methods: {},
	computed: {},
};
</script>
