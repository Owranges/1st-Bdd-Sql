<template>
<div>
    <h1>This is Dashboard page</h1>
    <hr>
    <p>Welcome to you connected user!</p>
    <b-button type="submit" variant="primary" @click="registerUser">Sign-Out</b-button>
</div>
    
</template>

<script>
export default {
    name : 'Dashboard',
    data() {
        return{
            token : this.$store.state.token

        }
    },
    methods :{
        registerUser(){
            
            this.$store.dispatch("DeleteToken")
            this.token = ''
            this.$router.push('/')
        }
        
    }
    
}
</script>