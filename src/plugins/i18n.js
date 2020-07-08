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
                    }, 
                    'es':{
                        login_btn_title:'Ingresar',
                        login_title_bar:'Iniciar sesión',
                        login_placeholder_username:'Usuario',
                        login_placeholder_password:'Contraseña',

                        menu_title_logout:'Cerrar sesión',
                    }
                };

export let i18n = new VueI18n({
    locale: 'en', // set locale
    fallbackLocale: 'es', // set fallback locale
    messages, // set locale messages
    silentTranslationWarn: process.env.NODE_ENV === 'production'
    });
