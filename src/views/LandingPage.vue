<template>
  <div class="landingpage">
    <!-- show this if survey_complete == false -->
    <div class="take_survey" v-if="!survey_complete">
      <br />
      <br />
      <div>
        <h1 class="title" style="color: #e24c27">New Human Survey</h1>
        <div class="center">
          <h5>
            <center>
              Welcome! We are so excited that you are joining the Mutually Human team. Before your first day, we'd love
              to learn a little bit about you. Please answer a few of the following questions and let us know if you
              have any questions before your first day.
            </center>
          </h5>
        </div>
        <div class="center">
          <form :action="`/about/${this.user_id}`">
            <div class="d-grid gap-2 col-3 mx-auto">
              <button type="submit" class="btn btn-primary btn-sm" :action="`/about/${this.user_id}`">Start</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- show this is survey_complete == true  -->
    <div class="survey-results" v-if="survey_complete">
      <br />
      <br />
      <div>
        <h1 class="title" style="color: #e24c27">All about you</h1>
      </div>
      <br />
      <div>
        <h6 style="color: #999999"><strong>NAME</strong></h6>
        <h6>
          <strong>{{ name }}</strong>
        </h6>
      </div>
      <br />
      <div>
        <h6 style="color: #999999"><strong>ACCOMPLISHMENTS</strong></h6>
        <!-- <h6><strong>Receiving a Full Stack Software Development Certificate from Actualize Coding Bootcamp</strong></h6> -->
        <h6>
          <strong>{{ accomplishments }}</strong>
        </h6>
      </div>
      <br />
      <div>
        <h6 style="color: #999999"><strong>SUPERPOWER</strong></h6>
        <h6>
          <strong>{{ superpower }}</strong>
        </h6>
      </div>
      <br />
      <div>
        <h6 style="color: #999999"><strong>SNACKS</strong></h6>
        <h6 v-for="snack in snacks" v-bind:key="snack.description">
          <strong>{{ snack }}</strong>
        </h6>
      </div>
      <br />
      <div>
        <h6 style="color: #999999"><strong>DRINKS</strong></h6>
        <h6 v-for="drink in drinks" v-bind:key="drink">
          <strong>{{ drink }}</strong>
        </h6>
      </div>
      <br />
      <div>
        <h6 style="color: #999999"><strong>PEOPLE</strong></h6>
        <h6 v-for="person in people" v-bind:key="person">
          <strong>{{ person }}</strong>
        </h6>
      </div>
      <br />
      <div>
        <h6 style="color: #999999"><strong>SHORT TERM GOAL</strong></h6>
        <strong>{{ short_term_goals }}</strong>
      </div>
      <br />
      <div>
        <h6 style="color: #999999"><strong>LONG TERM GOAL</strong></h6>
        <strong>{{ long_term_goals }}</strong>
      </div>
      <br />

      <div class="center">
        <form :action="`/about/${this.user_id}`">
          <div class="d-grid gap-2 col-3 mx-auto">
            <button type="submit" class="btn btn-primary btn-sm" :action="`/about/${this.user_id}`">Retake</button>
          </div>
        </form>
      </div>
      <div class="">
        <a href="/signout">Sign out</a>
      </div>
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
      user_id: this.$route.params.id,
      name: "",
      accomplishments: "",
      superpower: "",
      drinks: [],
      snacks: [],
      people: [],
      short_term_goals: "",
      long_term_goals: "",
      user: [],
      survey_complete: [],
    };
  },
  mounted() {},
  created: function () {
    this.userShow();
  },
  methods: {
    userShow: function () {
      console.log("user_id->", this.user_id);
      axios.get(`/users/${this.user_id}`).then((response) => {
        console.log("userShow ->", response.data);

        //check survey status for user
        console.log("user-survey", response.data.survey_complete);
        if (response.data.survey_complete == true) {
          this.survey_complete = true;
        } else {
          this.survey_complete = false;
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
        if (response.data.favorites.drinks) {
          var userDrinks = [];
          var i = 0;
          while (i < response.data.favorites.drinks.length) {
            userDrinks.push(response.data.favorites.drinks[i].description);
            i++;
          }
          console.log(userDrinks);
          this.drinks = userDrinks;
        } else {
          this.drinks = [];
        }

        // get user's snacks
        if (response.data.favorites.snacks) {
          var userSnacks = [];
          i = 0;
          while (i < response.data.favorites.snacks.length) {
            userSnacks.push(response.data.favorites.snacks[i].description);
            i++;
          }
          console.log(userSnacks);
          this.snacks = userSnacks;
        } else {
          this.snacks = [];
        }

        // get user's people
        if (response.data.favorites.people) {
          var userPeople = [];
          i = 0;
          while (i < response.data.favorites.people.length) {
            userPeople.push(response.data.favorites.people[i].description);
            i++;
          }
          console.log(userPeople);
          this.people = userPeople;
        } else {
          this.people = [];
        }
      });
    },
  },
};
</script>
