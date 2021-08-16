<template>
  <div class="landingpage">
    <br />
    <br />
    <div class="title">
      <h1 style="color: #e24c27">Sign in</h1>
    </div>
    <div class="center">
      <form v-on:submit.prevent="submit()">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            v-model="email"
          />
          <div id="emailHelp" class="form-text" v-for="error in errors" v-bind:key="error">
            {{ error }}
          </div>
        </div>

        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" v-model="password" />
        </div>

        <div class="d-grid gap-2 col-12 mx-auto">
          <button type="submit" class="btn btn-primary btn-sm btn-block">Sign In</button>
        </div>
      </form>
    </div>
    <div class="">
      <br />
      <p>
        Don't have an account?
        <a href="/">Sign up</a>
      </p>
    </div>
  </div>
</template>

<style>
.title {
  font-family: "Nightype", Helvetica, Arial;
  font-style: normal;
  font-weight: 100;
}

.btn-primary,
.btn-primary:hover,
.btn-primary:active,
.btn-primary:visited {
  background-color: #e24c27 !important;
}

.center {
  margin: auto;
  width: 30%;
  border: 0px solid;
  padding: 10px;
  text-align: left;
}
.form-text {
  color: rgb(255, 0, 0);
}
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      email: "",
      password: "",
      password_confirmation: "",
      errors: [],
    };
  },
  created: function () {},
  methods: {
    submit: function () {
      var params = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("/sessions", params)
        .then((response) => {
          console.log(response.data);
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.$router.push(`/landingpage/${response.data.user_id}`);
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>
