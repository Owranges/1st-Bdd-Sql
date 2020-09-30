<template>
  <div>
    <p>ContactList</p>
    <ul>
      <li v-for="contact in Contactes" v-bind:key="contact.email">
        name:{{ contact.name }} <br />
        email:{{ contact.email }}
      </li>
    </ul>
    <button>Add</button>
  </div>
</template>

<script>
export default {
  name: "ContactList",
  data() {
    return {
      contactTab: this.$store.state.contacts,
      id: this.$store.state.tokenIDs,
      token: this.$store.state.tokens,
    };
  },
  beforeMount() {
    this.ListOfContacts();
  },
  computed: {
    Contactes() {
      return this.$store.getters.Contactes(this.contactTab);
    },
  },
  methods: {
    ListOfContacts() {
      const headers = {
        "Content-Type": "application/json",
        Authorization: this.token,
      };
      console.log(this.id);
      console.log("im in listofcontact");
      this.axios
        .get(`http://localhost:8000/get-contacts/${this.id}`, {
          headers: headers,
        })
        .then((response) => {
          console.log(response);
          console.log(response);
          if (response.status == 200) {
            response.data.forEach((element) => {
              this.$store.dispatch("GetContacts", response.data);
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
