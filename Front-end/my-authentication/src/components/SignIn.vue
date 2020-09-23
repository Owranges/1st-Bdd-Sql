<template>
    <form @submit="onSubmit" @reset="onReset">

      <b-form-group 
        description="We'll never share your email with anyone else."
      >
       <b-form-group class="input" label="Email:">
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
       </b-form-group>
      </b-form-group>

      <b-form-group class="input" label="Password:">
        <b-form-input
          id="input-3"
          v-model="form.password"
          placeholder="Enter your secret password"
          
          required
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary" @click="checkUser">Sign-In</b-button>
    </form>
 
  
</template>

<script>
  export default {
      name : "SignIn",
    data() {
      return {
        form: {
          email: '',
          password: '',
        },
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        // alert(JSON.stringify(this.form))
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.password = ''
        // Trick to reset/clear native browser form validation state
      },
      checkUser(){
        console.log(this.form);
        this.axios.post('http://localhost:8000/sign-in', this.form).then((response)=> {
            console.log("t'es trop baleze")
            console.log(response);
            if(response.data == "you are authenticated"){
              this.$router.push('/dashboard')
            }
            })
            .catch(err => {
              console.log(err)
              alert("Ur email or password isn't known")
             
            });
      }
        

      }
    }
  
</script>

<style>
form{
    text-align: left;
}
.input{
    width: 50%;
    justify-content: center;
}
</style>


