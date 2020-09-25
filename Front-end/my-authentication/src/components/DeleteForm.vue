<template>
<div>
    <form @submit="onSubmit" @reset="onReset">
        <p v-if="mistake== ''"></p>
      <p v-else-if="mistake == 'delete'" >Your account has been Deleted u</p>
      <p v-else>Your email, or password are incorrect</p>
  

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
      <b-button type="submit" variant="primary" @click="deleteUser(form.email,form.password)">Delete User</b-button>
    </form>
 
    
</div>
    
</template>

<script>
export default {
    name : 'DeleteForm',
    data(){
        return{
            token : this.$store.state.token,
            form: {
            email: '',
            password: '',
            },
            mistake: ''
        }
    },
    
    methods:{
        deleteUser(){
            console.log();
         
            
            console.log(this.form);
            this.axios.delete(`http://localhost:8000/sign-out/${this.form.email}&${this.form.password}`).then((res) => {
                console.log(res.data);
            if(res.data === 'Ur password or email is incorrect'){
                console.log('je suis dans le if');
                this.mistake = 'else'
            }else
            console.log('je suis dans le else');
            this.mistake = 'delete'
            this.$store.dispatch("DeleteToken")
            this.token = ''
            this.$router.push('/')
            console.log(res);
            }).catch((err) => {
                console.log(err);
                this.mistake = 'else'
            })
            

        },
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
    }
}
</script>