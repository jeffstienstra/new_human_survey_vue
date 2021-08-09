<template>
  <div class="goals">
    <br />
    <br />
    <div class="center">
      <div class="progress" style="height: 10px">
        <div
          class="progress-bar"
          role="progressbar"
          style="width: 100%"
          aria-valuenow="33"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
    <br />
    <div>
      <h1 style="color: #e24c27">Goals</h1>
    </div>

    <div class="center">
      <form v-on:submit.prevent="submit()">
        <div class="mb-3">
          <label for="" class="form-label">What are your short term goals?</label>
          <!-- <input type="text" class="form-control" v-model="short_term_goals" /> -->
          <div class="input-group">
            <textarea type="text" class="form-control" v-model="short_term_goals"></textarea>
          </div>
        </div>
        <div class="mb-3">
          <label for="" class="form-label">What are your long term goals?</label>
          <!-- <input type="text" class="form-control" v-model="long_term_goals" /> -->
          <div class="input-group">
            <textarea type="text" class="form-control" v-model="long_term_goals"></textarea>
          </div>
        </div>

        <div class="container">
          <div class="row">
            <div class="col">
              <form action="/favorites">
                <div class="d-grid gap-0 col-13 mx-auto">
                  <button type="submit" class="btn btn-secondary btn-sm" action="/favorites">Back</button>
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
      short_term_goals: "",
      long_term_goals: "",
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
        short_term_goals: this.short_term_goals,
        long_term_goals: this.long_term_goals,
      };
      console.log(params);
      axios
        .post("/goals", params)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.$router.push("/landingpage");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = error.response;
        });
    },
  },
};
</script>
