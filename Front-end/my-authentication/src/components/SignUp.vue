<template>
  <form @submit="onSubmit">
    <p v-if="reponse == 'hi'">It's time to register</p>
    <p v-else-if="reponse == 'good'">You have registered go Sign-In now!</p>
    <p v-else-if="reponse == 'already'">This email already exist</p>
    <p v-else-if="reponse == 'bad'">Registration Failed</p>

    <b-form-group
      class="input"
      label="Name:"
      :class="{ 'form-group--error': $v.name.$error }"
    >
      <b-form-input
        id="input-2"
        v-model="$v.name.$model"
        required
        placeholder="Enter name"
        v-on:keyup="keymonitor"
      ></b-form-input>
      <div class="error" v-if="!$v.name.required">Name is required</div>
      <div class="error" v-if="!$v.name.minLength">
        Name must have at least {{ $v.name.$params.minLength.min }} letters.
      </div>
    </b-form-group>

    <b-form-group description="We'll never share your email with anyone else.">
      <b-form-group class="input" label="Email:">
        <b-form-input
          id="input-1"
          v-model="$v.email.$model"
          type="email"
          required
          placeholder="Enter email"
          v-on:keyup="keymonitor"
        ></b-form-input>
        <div class="error" v-if="!$v.email.required">email is required</div>
        <div class="error" v-if="!$v.email.minLength">
          email must have at least {{ $v.email.$params.minLength.min }} letters.
        </div>
      </b-form-group>
    </b-form-group>

    <b-form-group class="input" label="Password:">
      <b-form-input
        id="input-3"
        v-model="$v.password.$model"
        placeholder="Enter your secret password"
        required
        v-on:keyup="keymonitor"
      ></b-form-input>
      <div class="error" v-if="!$v.password.required">password is required</div>
      <div class="error" v-if="!$v.password.minLength">
        password must have at least
        {{ $v.password.$params.minLength.min }} letters.
      </div>
    </b-form-group>

    <b-button
      type="submit"
      variant="primary"
      :disabled="submitStatus === 'PENDING'"
      >Sign-Up</b-button
    >

    <p v-if="this.notFull == ''"></p>
    <p v-else>The form isn't fill</p>
  </form>
</template>

<script>
import { required, minLength, between } from "vuelidate/lib/validators";
export default {
  name: "SignUp",
  data() {
    return {
      reponse: "hi",
      notFull: "",

      email: "",
      name: "",
      password: "",
      submitStatus: "",
    };
  },
  validations: {
    name: {
      required,
      minLength: minLength(4),
    },
    email: {
      required,
      minLength: minLength(5),
    },
    password: {
      required,
      minLength: minLength(6),
    },
  },
  methods: {
    // myFunctionHere(){
    //   console.log("dirty");
    // },
    onSubmit(evt) {
      evt.preventDefault();

      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.submitStatus = "PENDING";
        this.registerUser(event);
      }
    },
    keymonitor: function (event) {
      event.preventDefault();
      this.$v.$touch();
      if (event.key == "Enter") {
        if (this.$v.$invalid) {
          this.submitStatus = "ERROR";
        } else {
          this.submitStatus = "PENDING";
          this.registerUser(event);
        }
      }
    },

    registerUser(event) {
      if (this.email == "" || this.name == "" || this.password == "") {
        this.notFull = "empty";
      } else {
        this.axios
          .post("http://localhost:8000/sign-up", {
            email: this.email,
            name: this.name,
            password: this.password,
          })
          .then((res) => {
            if (res.data == "This email already exist") {
              this.reponse = "already";
            } else if (res.status == 200) {
              this.email = "";
              this.name = "";
              this.password = "";
              this.reponse = "good";
              this.submitStatus = "OK";
              this.notFull = "";
            } else {
              this.submitStatus = "OK";
            }
          })
          .catch((err) => {
            console.log(err);
            if (err == 404) this.reponse = "bad";
          });
      }
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
.form-group--error {
  color: red;
}
.error {
  color: red;
}
</style>
