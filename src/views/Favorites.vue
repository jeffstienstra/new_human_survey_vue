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
  created: function () {
    this.userShow();
  },

  methods: {
    userShow: function () {
      console.log(this.user);
      axios.get("/users/:id").then((response) => {
        console.log("userShow ->", response.data);
        console.log("#1", response.data.favorites.drinks[0].description);

        //check survey status for user
        if (response.data.survey_complete == true) {
          this.survey_complete = false;
        } else {
          this.survey_complete = true;
        }

        // get user's name
        this.name = response.data.abouts[0].name;
        console.log("name ->", response.data.abouts[0].name);

        //get user's accomplishments
        this.accomplishments = response.data.abouts[0].accomplishments;
        console.log("acomplishments ->", response.data.abouts[0].accomplishments);

        //get user's superpower
        this.superpower = response.data.abouts[0].superpower;
        console.log("superpower ->", response.data.abouts[0].superpower);

        //get user's short_term_goals
        this.short_term_goals = response.data.goals[0].short_term_goal;
        console.log("short_term_goals ->", response.data.goals[0].short_term_goal);

        //get user's long_term_goals
        this.long_term_goals = response.data.goals[0].long_term_goal;
        console.log("long_term_goals ->", response.data.goals[0].long_term_goal);

        // get user's drinks
        var userDrinks = [];
        var i = 0;
        while (i < response.data.favorites.drinks.length) {
          userDrinks.push(response.data.favorites.drinks[i].description);
          i++;
        }
        console.log(userDrinks);
        this.drinks = userDrinks;

        // get user's snacks
        var userSnacks = [];
        i = 0;
        while (i < response.data.favorites.snacks.length) {
          userSnacks.push(response.data.favorites.snacks[i].description);
          i++;
        }
        console.log(userSnacks);
        this.snacks = userSnacks;

        // get user's people
        var userPeople = [];
        i = 0;
        while (i < response.data.favorites.people.length) {
          userPeople.push(response.data.favorites.people[i].description);
          i++;
        }
        console.log(userPeople);
        this.people = userPeople;
      });
      // .catch((error) => {
      //   this.errors = error.response.data.errors;
      // });
    },
    submit: function () {
      var params = {
        drinks: this.drinks,
        snacks: this.snacks,
        people: this.people,
      };
      console.log(params);
      axios.post("/favorites", params).then((response) => {
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        this.$router.push("/goals");
      });
    },
  },
};
</script>
