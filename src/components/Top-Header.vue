<template>
  <div>
    Logged in
    <div v-if="loggedIn">Yes</div>
    <div v-else>No</div>
    <button @click="signOut">Sign out</button>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "top-header",
  mounted() {
    console.log("test");
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        console.log("signed in");
        this.loggedIn = true;
      } else {
        // No user is signed in.
        console.log("signed out");
        this.loggedIn = false;
      }
    });
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(data => {
          this.$router.replace({ name: "login" });
          console.log("sing out", data);
        });
    }
  },
  data() {
    return {
      loggedIn: false
    };
  }
};
</script>

<style lang="scss" scoped>
</style>