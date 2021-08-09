<template>
  <div class="favorites">
    <br />
    <br />
    <div class="center">
      <div class="progress" style="height: 10px">
        <div
          class="progress-bar"
          role="progressbar"
          style="width: 66%"
          aria-valuenow="33"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
    <br />
    <div>
      <h1 style="color: #e24c27">Your favorites</h1>
    </div>

    <div class="center">
      <form v-on:submit.prevent="submit()">
        <div class="mb-3">
          <label for="" class="form-label">Drinks</label>
          <input type="text" class="form-control" v-model="drinks" />
        </div>
        <div class="mb-3">
          <label for="" class="form-label">Snacks</label>
          <input type="text" class="form-control" v-model="snacks" />
        </div>
        <div class="mb-3">
          <label for="" class="form-label">People in your life, relationship</label>
          <input type="text" class="form-control" v-model="people" />
        </div>

        <div class="container">
          <div class="row">
            <div class="col">
              <form action="/about">
                <div class="d-grid gap-0 col-13 mx-auto">
                  <button type="submit" class="btn btn-secondary btn-sm" action="/about">Back</button>
                </div>
              </form>
            </div>
            <div class="col">
              <div class="d-grid gap-2 col-13 mx-auto">
                <button type="submit" class="btn btn-primary btn-sm btn-block">Continue</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
.progress-bar,
.btn-primary,
.btn-primary:hover,
.btn-primary:active,
.btn-primary:visited {
  background-color: #e24c27 !important;
}
.btn-secondary {
  background-color: #dadada !important;
  color: #404040;
}
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      drinks: [],
      snacks: [],
      people: [],
    };
  },
  created: function () {},

  methods: {
    // favoritesIndex: function () {
    //   axios.post("/favorites").then((response) => {
    //     console.log("Favorites ->", response);
    //     this.myFavorites = response.data;
    //   });
    // },
    submit: function () {
      var params = {
        drinks: this.drinks,
        snacks: this.snacks,
        people: this.people,
      };
      console.log(params);
      axios
        .post("/favorites", params)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.$router.push("/goals");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = error.response;
        });
    },
  },
};
</script>
