# MySQL VUE AUTHENTIFICATION PLATFORM
Project Name : my-authentification-platform

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
    ![image](https://user-images.githubusercontent.com/61117157/113859215-f1acda80-97a4-11eb-8ea1-7194a13491f4.png)
    ![image](https://user-images.githubusercontent.com/61117157/113859467-3a649380-97a5-11eb-9945-5b58029e4e87.png)
    
This route is use to log in.
 ![image](https://user-images.githubusercontent.com/61117157/113859521-49e3dc80-97a5-11eb-8d79-1165eec354c6.png)
 
This route is for connected user where they can addContacts and see the list of them
    ![image](https://user-images.githubusercontent.com/61117157/113859521-49e3dc80-97a5-11eb-8d79-1165eec354c6.png)
    ![image](https://user-images.githubusercontent.com/61117157/113859755-93342c00-97a5-11eb-81cb-f72c22d716be.png)
    ![image](https://user-images.githubusercontent.com/61117157/113859805-9c24fd80-97a5-11eb-9015-19e8f0f1f300.png)



Technologies

 - node.js
 - mysql
 - SQL database
 - bcrypt
 - jsonwebtoken
 - express
 - middleware
 - vue.js
 - vuex
 - vueRouter
 - vuelidate
 - vue-axios
 - vuex-persistedstate
 - bootstrap-vue
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
