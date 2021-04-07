<template>
  <form @submit="onSubmit">
    <p v-if="mistake == ''"></p>
    <p v-else-if="mistake == 'failed'">Your Email or Password is incorrect</p>

    <b-form-group description="We'll never share your email with anyone else.">
      <b-form-group class="input" label="Email:">
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
          v-on:keyup="keymonitor"
        ></b-form-input>
      </b-form-group>
    </b-form-group>

    <b-form-group class="input" label="Password:">
      <b-form-input
        id="input-3"
        v-model="form.password"
        placeholder="Enter your secret password"
        required
        v-on:keyup="keymonitor"
        type="password"
      ></b-form-input>
    </b-form-group>
    <b-button type="submit" variant="primary" @click="checkUser"
      >Sign-In</b-button
    >
  </form>
</template>

<script>
export default {
  name: "SignIn",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      token: "",
      mistake: "",
      nameToken: "",
      idToken: "",
      emailToken: "",
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      // alert(JSON.stringify(this.form))
    },
    // onReset(evt) {
    //   evt.preventDefault()
    //   // Reset our form values
    //   this.form.email = ''
    //   this.form.password = ''
    //   // Trick to reset/clear native browser form validation state
    // },
    keymonitor: function (event) {
      console.log(event.key);

      if (event.key == "Enter") {
        this.checkUser(event);
      } else if (event.key == onclick) this.checkUser();
    },
    decodeToken(token) {
      atob(token.split(".")[1]);
      let myToken = JSON.parse(atob(token.split(".")[1]));
      this.nameToken = myToken.name;
      this.idToken = myToken.id;
      this.emailToken = myToken.email;
    },
    checkUser() {
      this.axios
        .post("http://localhost:8000/sign-in", this.form)
        .then((response) => {
          console.log(response);

          if (response.data.auth == true) {
            this.token = response.data.token;
            this.decodeToken(response.data.token);
            this.$store.dispatch("tokenName", {
              Tokename: this.nameToken,
              Tokeid: this.idToken,
              Tokenemail: this.emailToken,
            });
            console.log(this.emailToken);

            this.$store.dispatch("Token", response.data.token);
            if (this.$route.path !== "/dashboard") {
              this.$router.push("/dashboard");
            }
          } else {
            console.log("failed");
            this.mistake = "failed";
          }
        })
        .catch((err) => {
          console.log(err);
          this.mistake = "failed";
          // alert("Ur email or password isn't known")
        });
    },
  },
};
</script>

<style>
form {
  text-align: left;
}
.input {
  width: 50%;
  justify-content: center;
}
</style>
