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
                        miscelanius_approve_item:'Approve',
                        miscelanius_reject_item:'Reject',
                        miscelanius_detail_item:'Detail',
                        miscelanius_payment_item:'Payment',

                        miscelanius_save_item:'Save',
                        miscelanius_cancel_item:'Cancel',
                        miscelanius_next_item:'Next',
                        miscelanius_previuos_item:'Previous',

                        message_title_global:'Message',
                        message_result_success:'Record saved successfully',
                        message_result_edit_success:'Record updated successfully',
                        message_result_delete_success:'Record deleted successfully',
                        message_result_error:'An error ocurred: ',
                        message_result_login_error:'Invalid grants, try again',

                        /*Validaciones vee-validate*/
                        global_validation_required: '{field} is required',
                        global_validation_valid: '{field} must be valid',
                        global_validation_min: '{field} must contain at least {param} characters',
                        global_validation_numeric:'{field} must be a number',

                        /* Mensajes vista usuarios */
                        message_tab_personal_data: 'Personal data',
                        message_tab_notification_data: 'Notification data',
                        message_tab_account_data: 'Account data',

                        vuetify: {
                            dataFooter: {
                                itemsPerPageText: 'Items per page:',
                                itemsPerPageAll: 'All',
                                nextPage: 'Next page',
                                prevPage: 'Previous page',
                                firstPage: 'First page',
                                lastPage: 'Last page',
                                pageText: '{0}-{1} of {2}',
                              },
                        }
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
                        miscelanius_approve_item:'Aprobar',
                        miscelanius_reject_item:'Rechazar',
                        miscelanius_detail_item:'Detalle',
                        miscelanius_payment_item:'Pagar',

                        miscelanius_save_item:'Guardar',
                        miscelanius_cancel_item:'Cancelar',
                        miscelanius_next_item:'Siguiente',
                        miscelanius_previuos_item:'Anterior',

                        message_title_global:'Mensaje',
                        message_result_success:'Registro guardado con éxito',
                        message_result_edit_success:'Registro actualizado con éxito',
                        message_result_delete_success:'Registro eliminado con éxito',
                        message_result_error:'Ocurrió un error: ',
                        message_result_login_error:'Credenciales inválidas, intente de nuevo',

                        /*Validaciones vee-validate*/
                        global_validation_required: '{field} es requerido(a)',
                        global_validation_valid: '{field} debe ser válido(a)',
                        global_validation_min: '{field} debe contener al menos {param} caracteres',
                        global_validation_numeric:'{field} debe ser un número',

                        /* Mensajes vista usuarios */
                        message_tab_personal_data: 'Datos personales',
                        message_tab_notification_data: 'Datos de notificación',
                        message_tab_account_data: 'Datos de la cuenta',

                        vuetify:{
                            dataFooter: {
                                itemsPerPageText: 'Filas por página',
                                itemsPerPageAll: 'Todos',
                                nextPage: 'Página siguiente',
                                prevPage: 'Página anterior',
                                firstPage: 'Primer página',
                                lastPage: 'Última página',
                                pageText: '{0}-{1} de {2}',
                              },
                        }

                    }
                };

export let i18n = new VueI18n({
    locale: 'es', // set locale
    fallbackLocale: 'en', // set fallback locale
    messages, // set locale messages
    silentTranslationWarn: process.env.NODE_ENV === 'production'
    });
