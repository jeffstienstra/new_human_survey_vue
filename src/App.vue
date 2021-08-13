<template>
  <div id="app">
    <!-- <router-link :to="`/landingpage/${response.data.user_id}`">Landing Page</router-link> -->
    |
    <router-link to="/about">About</router-link>
    |
    <router-link to="/favorites">Favorites</router-link>
    |
    <router-link to="/goals">Goals</router-link>
    |
    <router-link to="/">Sign Up</router-link>
    |
    <router-link to="/signin">Sign In</router-link>
    |
    <router-link to="/signout">Sign Out</router-link>

    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

/* @font-face {
  src: url(fonts/nightype.ttf);
  font-family: "nightype";
  font-style: normal;
  font-weight: 100;
} */

/* .title {
  font-family: nightype;
} */

body {
  background-color: #fafcfe !important;
}
</style>
