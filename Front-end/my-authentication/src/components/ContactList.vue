<template>
  <div>
    <p>ContactList</p>
    <button @click="ListOfContacts">Add</button>
  </div>
</template>

<script>
export default {
  name: "ContactList",
  data() {
    return {
      email: this.$store.state.tokenMail,
    };
  },
  methods: {
    ListOfContacts() {
      console.log(this.email);
      this.axios
        .get(`http://localhost:8000/get-contacts/'${this.email}'`)
        .then((response) => {
          console.log(response + "aaa");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
