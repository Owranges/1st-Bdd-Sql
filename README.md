# 1st-Bdd-Sql
Project Name : my-authetification-platform

    My first system of authentification

App

This authentification app crypt password and use token identification

    You can create a user
    You can authentifiate a register user
    A register user can add, delete a contact and update the contact email

The password is hash with bcrypt.
When an user sign-in with the token (jwt) we give him acces to "dashboard", where he can manage his contact
Finally the user can logout (no acces to dashboard).
And the API end point are secure, check for token (authentification midlleware)

This route is use to create an user.

    crypt password:
    
This route is use to log in.

    handle email error:


Technologies

    node.js
    mysql
    SQL database
    bcrypt
    jsonwebtoken
    express
    middleware
    vue.js
    vuex
    vueRouter
    vuelidate
    vue-axios
    vuex-persistedstate
    bootstrap-vue
    ...

Pratice

    Node.js and many module
    Build an API
    work with express
    Database in mysql
    bcrypt (hash, salt)
    JWT (jsonwebtoken)
    How to make middleware and use them
    Vue.js and vue CLI to create the prject
    Vue-axios and how to connect back and front
    Vue-router and how to handle the acces of route
    Vuex and is fabulous store
    vuex-persistedstate
    Vuelidate so efficient
    Bootstrap.vue make life easier
    Postman for test the api
    ...
