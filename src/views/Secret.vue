<template>
  <div>
    <h3>
      <h5 v-for="secret in secrets" :key="secret.char_id">{{secret.name}}</h5>
    </h3>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      secrets: ""
    };
  },
  async mounted() {
    console.log("hi");
    const token = await firebase.auth().currentUser.getIdToken();
    console.log("token", token);
    let config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    this.secrets = await this.$axios.get("http://localhost:3000/erik", config);
    this.secrets = this.secrets.data;
  }
};
</script>

<style lang="scss" scoped>
</style>