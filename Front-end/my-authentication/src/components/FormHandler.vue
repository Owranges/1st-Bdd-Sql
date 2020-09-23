<template>
  <div>
  <b-tabs content-class="mt-3">
    <b-tab title="SignUp" active><SignUp/></b-tab>
    <b-tab title="SignIn"><SignIn/></b-tab>
  </b-tabs>
  </div>
</template>

<script>
import SignUp from "./SignUp"
import SignIn from "./SignIn"
export default {
  name : "FormHandler",
  components : {SignUp, SignIn}
  
}
</script>

<style>

</style>