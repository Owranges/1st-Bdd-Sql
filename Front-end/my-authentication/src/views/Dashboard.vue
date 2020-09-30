<template>
  <div>
    <header><ConnectedHeader /></header>
    <h1>This is Dashboard page</h1>
    <hr />
    <p>Welcome to you connected user!</p>
    <b-tabs content-class="mt-3">
      <b-tab title="AddContact" active><AddContactForm /></b-tab>
      <b-tab title="Contacts"><ContactList /></b-tab>
      <b-tab title="DeleteUrAccount"><DeleteForm /></b-tab>
    </b-tabs>
  </div>
</template>

<script>
import AddContactForm from "../components/AddContactForm";
import ContactList from "../components/ContactList";
import DeleteForm from "../components/DeleteForm";
import ConnectedHeader from "../components/ConnectedHeader";

export default {
  name: "Dashboard",
  components: { DeleteForm, ConnectedHeader, AddContactForm, ContactList },
  date() {
    return {};
  },
};
</script>
