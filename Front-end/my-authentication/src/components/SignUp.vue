<template>
  
    <form @submit="onSubmit" >
      <p v-if="reponse == 'hi'">It's time to register</p>
      <p v-else-if="reponse == 'good'" >You have registered go Sign-In now!</p>
      <p v-else-if="reponse == 'already'" >This email already exist</p>
      <p v-else-if="reponse == 'bad'">Registration Failed</p>

      <b-form-group class="input"  label="Name:" >
        <b-form-input
            
          id="input-2"
          v-model="form.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        description="We'll never share your email with anyone else."
      >
       <b-form-group class="input" label="Email:" >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
       </b-form-group>
      </b-form-group>


      <b-form-group class="input" label="Password:" >
        <b-form-input
          id="input-3"
          v-model="form.password"
          placeholder="Enter your secret password"
          
          required
        ></b-form-input>
      </b-form-group>

    

      <b-button type="submit" variant="primary" @click="registerUser">Sign-Up</b-button>
      
     <p v-if="this.notFull == ''"></p>
     <p v-else >The form isn't fill</p>
    </form>

  
</template>

<script>
  export default {
      name : "SignUp",
    data() {
      return {
        reponse :'hi',
        notFull:'',
        form: {
          email: '',
          name: '',
          password: '',
        },
       
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        // alert(JSON.stringify(this.form))
      },
      // onReset(evt) {
      //   evt.preventDefault()
      //   // Reset our form values
      //   this.form.email = ''
      //   this.form.name = ''
      //   this.form.password = ''
      //   // Trick to reset/clear native browser form validation state
      // },
      registerUser(event){
          
          if(this.form.email == '' || this.form.name == '' || this.form.password == ''){
            this.notFull = 'empty'
          }else{
            this.axios.post("http://localhost:8000/sign-up", this.form).then((res)=> {
              
              
            if(res.data == "This email already exist"){
              this.reponse = "already"
            }
            else if(res.status == 200) {

              this.reponse = "good"
              this.notFull = ''
            }
            })
            .catch(err => {
              console.log(err);
              if(err == 404)
              this.reponse = "bad"
            });
          }
          
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