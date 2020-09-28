<template>
  <div>
    <nav>
      <p>Dashboard</p>
      <p>{{ tokenName }}</p>
    </nav>

    <b-button type="submit" variant="primary" @click="registerUser"
      >Sign-Out</b-button
    >
  </div>
</template>

<script>
export default {
  name: "ConnectedHeader",

  data() {
    return {
      token: this.$store.state.token,
      nameUser: "",
      tokenName: this.$store.state.tokenNames,
      tokenID: this.$store.state.tokenIDs,
    };
  },
  methods: {
    registerUser() {
      this.$store.dispatch("DeleteToken");
      this.token = "";
      this.$router.push("/");
    },
  },
};
</script>
