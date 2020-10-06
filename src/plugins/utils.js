import store from '../store'

export default {

	SISCAP_MENU : "SISCAP_MENU",
	SISCAP_AUTH : "SISCAP_AUTH",

	construir_menu()
	{
		var menu = []
		/*obtener los datos del local storage*/
		var datos = this.leer_storage()

		/*recorrer los datos para construir el menu*/
		if(datos && datos.length > 0){
			datos.forEach(function(item){
				/*verificar si el item es la base del desplegable*/
				if(item.menu_titulo_id === 0 && item.visibilidad != 'oculto'){
					var base = new Object
					base.titulo = item.titulo
					base.menu_titulo_id = item.menu_titulo_id
					base.icono = item.icono
					base.ruta_cliente = item.ruta_cliente
					base.visibilidad = item.visibilidad
					base.subgrupo = []

					/*segundo recorrido para insertar los submenus*/
					datos.forEach(function(subItem){

						if(item.id === subItem.menu_titulo_id && subItem.visibilidad != 'oculto'){

							var submenu = new Object
							submenu.titulo = subItem.titulo
							submenu.icono = subItem.icono
							submenu.ruta_cliente = subItem.ruta_cliente
							submenu.visibilidad = subItem.visibilidad

							/*insertar el elemento en el primer arreglo*/
							base.subgrupo.push(submenu)
						}
					})
					/*insertar la base completa*/
					menu.push(base)

					store.dispatch('setMenu', menu)
				}
			})
		}
	},

	construir_permisos(){
		var permisos = []
		/*obtener los datos del local storage*/
		var datos = this.leer_storage()

		let usuario = this.leer_usuario_storage()

		if(usuario)
		{
			
			store.dispatch('setLogin',true) //bandera de login
		}

		/*recorrer los datos para construir los permisos*/
		if(datos && datos.length > 0){
			
			datos.forEach(function(item){

				permisos.push(item.ruta_cliente)
			})
		}

		store.dispatch('setPermisos', permisos)
	},

	leer_storage(){

		return JSON.parse(localStorage.getItem(this.SISCAP_MENU))
	},

	leer_usuario_storage(){

		return JSON.parse(localStorage.getItem(this.SISCAP_AUTH))
	}
}