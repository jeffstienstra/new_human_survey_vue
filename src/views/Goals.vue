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
        <br />
        <div class="container">
          <div class="row">
            <div class="col">
              <form :action="`/favorites/${this.user_id}`">
                <div class="d-grid gap-0 col-13 mx-auto">
                  <button type="submit" class="btn btn-secondary btn-sm" :action="`/favorites/${this.user_id}`">
                    Back
                  </button>
                </div>
              </form>
            </div>
            <div class="col">
              <div class="d-grid gap-2 col-13 mx-auto">
                <button v-on:click="surveyComplete()" type="submit" class="btn btn-primary btn-sm btn-block">
                  Continue
                </button>
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
      user_id: this.$route.params.user_id,
      id: null,
      short_term_goals: "",
      long_term_goals: "",
      survey_complete: true,
      data: [],
    };
  },
  created: function () {
    this.userShow();
  },

  methods: {
    surveyComplete: function () {
      console.log("surveyComplete", this.data);
    },

    userShow: function () {
      axios.get(`/users/${this.user_id}`).then((response) => {
        if (response.data.goals.length > 0) {
          console.log("userShow ->", response.data);

          // var data = response.data;
          // console.log(data);

          this.id = response.data.goals[0].id;

          //get user's short_term_goals
          this.short_term_goals = response.data.goals[0].short_term_goal;
          console.log("short_term_goals ->", response.data.goals[0].short_term_goal);

          //get user's long_term_goals
          this.long_term_goals = response.data.goals[0].long_term_goal;
          console.log("long_term_goals ->", response.data.goals[0].long_term_goal);
        }
      });
    },
    submit: function () {
      var params = {
        user_id: this.$route.params.id,
        id: this.id,
        survey_complete: true,
        short_term_goals: this.short_term_goals,
        long_term_goals: this.long_term_goals,
      };
      console.log(params);
      if (this.id) {
        axios
          .patch(`/goals/${this.id}`, params)
          .then(() => {
            axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt");
            // this.$router.push(`/landingpage/${response.data.user_id}`);
          })
          .catch((error) => {
            console.log(error.response);
            this.errors = error.response.data.errors;
          });
      } else {
        axios
          .post(`/goals`, params)
          .then(() => {
            axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt");
            // this.$router.push(`/landingpage/${response.data.user_id}`);
          })
          .catch((error) => {
            console.log(error.response);
            this.errors = error.response.data.errors;
          });
      }
      axios.patch(`/users/${this.$route.params.id}`, this.survey_complete).then((response) => {
        axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt");
        console.log("users patch", response.data);
      });
    },
  },
};
</script>
