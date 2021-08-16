<template>
  <div class="landingpage">
    <br />
    <br />
    <div class="">
      <h1 class="title" style="color: #e24c27">Sign up</h1>
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
        <div class="mb-3">
          <label for="exampleInputPassword2" class="form-label">Confirm Password</label>
          <input type="password" class="form-control" id="exampleInputPassword2" v-model="password_confirmation" />
        </div>

        <div class="d-grid gap-2 col-12 mx-auto">
          <button type="submit" class="btn btn-primary btn-sm btn-block">Sign Up</button>
        </div>
      </form>
    </div>
    <div class="">
      <br />
      <p>
        Already have an account?
        <a href="/signin">Sign in</a>
      </p>
    </div>
  </div>
</template>

<style>
.btn-primary,
.btn-primary:hover,
.btn-primary:active,
.btn-primary:visited {
  background-color: #e24c27 !important;
}

.title {
  font-family: "Nightype", Helvetica, Arial;
  font-style: normal;
  font-weight: 100;
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
        password_confirmation: this.password_confirmation,
      };
      axios
        .post("/users", params)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/signin");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
