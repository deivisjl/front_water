import Vue from 'vue'; 
import VueI18n from 'vue-i18n'; 
Vue.use(VueI18n);

const messages = { 
                    'en':{
                        login_btn_title:'Login',
                        login_title_bar:'Welcome',
                        login_placeholder_username:'Username',
                        login_placeholder_password:'Password',

                        menu_title_logout:'Logout',
                        menu_title_search:'Search',

                        miscelanius_new_item:'New Item',
                        miscelanius_edit_title_item:'Edit Item',
                        miscelanius_edit_item:'Edit',
                        miscelanius_rol_item:'Rols',
                        miscelanius_delete_item:'Delete',
                        miscelanius_reload_item:'Reload',
                        miscelanius_update_item:'Update',

                        miscelanius_save_item:'Save',
                        miscelanius_cancel_item:'Cancel',

                        message_title_global:'Message',
                        message_result_success:'Record saved successfully',
                        message_result_edit_success:'Record updated successfully',
                        message_result_delete_success:'Record deleted successfully',
                        message_result_error:'An error ocurred: ',

                    }, 
                    'es':{
                        login_btn_title:'Ingresar',
                        login_title_bar:'Iniciar sesión',
                        login_placeholder_username:'Usuario',
                        login_placeholder_password:'Contraseña',

                        menu_title_logout:'Cerrar sesión',
                        menu_title_search:'Buscar',

                        miscelanius_new_item:'Nuevo registro',
                        miscelanius_edit_title_item:'Editar registro',
                        miscelanius_edit_item:'Editar',
                        miscelanius_rol_item:'Roles',
                        miscelanius_delete_item:'Borrar',
                        miscelanius_reload_item:'Recargar',
                        miscelanius_update_item:'Actualizar',

                        miscelanius_save_item:'Guardar',
                        miscelanius_cancel_item:'Cancelar',

                        message_title_global:'Mensaje',
                        message_result_success:'Registro guardado con éxito',
                        message_result_edit_success:'Registro actualizado con éxito',
                        message_result_delete_success:'Registro eliminado con éxito',
                        message_result_error:'Ocurrió un error: ',
                    }
                };

export let i18n = new VueI18n({
    locale: 'en', // set locale
    fallbackLocale: 'es', // set fallback locale
    messages, // set locale messages
    silentTranslationWarn: process.env.NODE_ENV === 'production'
    });
