<template>
  <div id="app">
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
  font-family: "Nightype";
  src: local("Nightype"), url(/public/fonts/nightype.ttf) format("truetype");
  font-style: normal;
  font-weight: 100;
} */

body {
  background-color: #fafcfe !important;
}
</style>
