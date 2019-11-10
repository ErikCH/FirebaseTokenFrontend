import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase/app";
import axios from "axios";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

const firebaseConfig = {
  apiKey: "AIzaSyCrqp1Puc-zKKudhnjmEhRbwY4HTxxwdNQ",
  authDomain: "proj-5fd86.firebaseapp.com",
  databaseURL: "https://proj-5fd86.firebaseio.com",
  projectId: "proj-5fd86",
  storageBucket: "proj-5fd86.appspot.com",
  messagingSenderId: "1042879394402",
  appId: "1:1042879394402:web:bd8d4e2786a64f5088173b"
};

firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged(user => {
  console.log("user", user);
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});

// app = new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount("#app");
