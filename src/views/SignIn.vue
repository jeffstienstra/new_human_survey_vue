<template>
  <div class="signin">
    <div class="center">
      <form v-on:submit.prevent="submit()">
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
        <div class="">
          <form class="form-example" action="" method="">
            <h1>Sign in</h1>
            <!-- Input fields -->
            <div class="form-group">
              <div class="form-group">
                <div><label for="floatingInput">Email address</label></div>
                <input type="email" v-model="email" class="form-control" placeholder="email address" />
              </div>
            </div>
            <div class="form-group">
              <div class="">
                <div><label for="floatingInput">Password</label></div>
                <input type="password" v-model="password" class="form-control" placeholder="password" />
              </div>
            </div>

            <!-- End input fields -->
          </form>
        </div>
      </form>
      <div class="d-grid gap-2 col-4 mx-auto">
        <button type="submit" value="Submit" class="btn btn-primary btn-sm btn-block">Sign in</button>
      </div>
      <p>
        Don't have an account?
        <a href="/">Sign up</a>
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
.center {
  margin: auto;
  width: 25%;
  border: 0px solid;
  padding: 10px;
}
</style>

<script>
// import axios from "axios";

export default {
  data: function () {
    return {
      errors: [],
      email: "",
      password: "",
      password_confirmation: "",
    };
  },
  created: function () {},
  methods: {},
};
</script>
