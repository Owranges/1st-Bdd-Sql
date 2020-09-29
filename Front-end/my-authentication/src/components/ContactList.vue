<template>
  <div>
    <p>ContactList</p>
    <p></p>
    <button @click="ListOfContacts">Add</button>
  </div>
</template>

<script>
export default {
  name: "ContactList",
  data() {
    return {
      id: this.$store.state.tokenIDs,
    };
  },
  // beforemounted() {
  //   this.ListOfContacts();
  // },
  methods: {
    ListOfContacts() {
      console.log(this.id);
      this.axios
        .get(`http://localhost:8000/get-contacts/${this.id}`)
        .then((response) => {
          console.log(JSON.stringify(response + "aaa"));
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
