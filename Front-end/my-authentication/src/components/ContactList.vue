<template>
  <div>
    <ul>
      <li
        class="li-contact"
        v-for="contact in Contactes"
        v-bind:key="contact.email"
      >
        <p class="name-contact">{{ contact.name }}</p>

        <p class="email-contact">{{ contact.email }}</p>
      </li>
    </ul>
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

<style>
.li-contact {
  list-style: none;
}
.name-contact {
  font-weight: bold;
}
.email-contact {
  font-style: italic;
}
</style>
