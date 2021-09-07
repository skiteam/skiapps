import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faSignOutAlt,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faUser, faSignOutAlt, faEllipsisV);

import { firestorePlugin } from "vuefire";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

Vue.use(firestorePlugin);
firebase.initializeApp({
  apiKey: "AIzaSyDppEeExWNKucC9DtG10Qk6IFbVnyoNbqE",
  authDomain: "skiapps-7bbd6.firebaseapp.com",
  databaseURL: "https://skiapps-7bbd6-default-rtdb.firebaseio.com",
  projectId: "skiapps-7bbd6",
  storageBucket: "skiapps-7bbd6.appspot.com",
  messagingSenderId: "330906452849",
  appId: "1:330906452849:web:81845c4e31708cc867acd0",
});

export const db = firebase.firestore();
export const auth = firebase.auth();

Vue.component("fa", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  render: function(h) {
    return h(App);
  },
}).$mount("#app");
