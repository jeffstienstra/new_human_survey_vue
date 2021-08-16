<template>
  <div class="about">
    <br />
    <br />

    <div class="center">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="d-grid gap-0 col-18 mx-auto">
              <div class="progress" style="height: 10px">
                <div
                  class="progress-bar"
                  role="progressbar"
                  style="width: 100%"
                  aria-valuenow="100"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="d-grid gap-0 col-18 mx-auto">
              <div class="progress" style="height: 10px">
                <div
                  class="progress-bar"
                  role="progressbar"
                  style="width: 0%"
                  aria-valuenow="33"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="d-grid gap-0 col-18 mx-auto">
              <div class="progress" style="height: 10px">
                <div
                  class="progress-bar"
                  role="progressbar"
                  style="width: 0%"
                  aria-valuenow="33"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="center">
      <div class="progress" style="height: 10px">
        <div
          class="progress-bar"
          role="progressbar"
          style="width: 33%"
          aria-valuenow="33"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div> -->
    <br />
    <div>
      <h1 class="title" style="color: #e24c27">About you</h1>
    </div>
    <div id="emailHelp" class="form-text" v-for="error in errors" v-bind:key="error">
      {{ error }}
    </div>

    <div class="center">
      <form v-on:submit.prevent="submit()" :action="`/favorites/${this.user_id}`">
        <div class="mb-3">
          <label for="" class="form-label">Name</label>
          <input type="text" class="form-control" v-model="name" />
        </div>
        <div class="mb-3">
          <label for="" class="form-label">What is an accomplishment you are really proud of?</label>
          <input type="text" class="form-control" v-model="accomplishments" />
        </div>
        <div class="mb-3">
          <label for="" class="form-label">What is your superpower?</label>
          <input type="text" class="form-control" v-model="superpower" />
        </div>
        <br />
        <div class="container">
          <div class="row">
            <div class="col">
              <form :action="`/landingpage/${this.user_id}`">
                <div class="d-grid gap-0 col-13 mx-auto">
                  <button type="submit" class="btn btn-secondary btn-sm" :action="`/landingpage/${this.user_id}`">
                    Back
                  </button>
                </div>
              </form>
            </div>
            <div class="col">
              <div class="d-grid gap-2 col-13 mx-auto">
                <button type="submit" class="btn btn-primary btn-sm btn-block" :action="`/favorites/${this.user_id}`">
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
      user_id: this.$route.params.id,
      id: null,
      name: "",
      accomplishments: "",
      superpower: "",
      errors: [],
    };
  },
  created: function () {
    this.userShow();
  },
  methods: {
    userShow: function () {
      axios.get(`/users/${this.user_id}`).then((response) => {
        if (response.data.abouts.length > 0) {
          console.log("userShow ->", response.data);

          this.id = response.data.abouts[0].id;
          // get user's name
          this.name = response.data.abouts[0].name;
          console.log("name ->", response.data.abouts[0].name);

          //get user's accomplishments
          this.accomplishments = response.data.abouts[0].accomplishments;
          console.log("acomplishments ->", response.data.abouts[0].accomplishments);

          //get user's superpower
          this.superpower = response.data.abouts[0].superpower;
          console.log("superpower ->", response.data.abouts[0].superpower);
        }
      });
    },
    submit: function () {
      var params = {
        id: this.id,
        name: this.name,
        accomplishments: this.accomplishments,
        superpower: this.superpower,
      };
      console.log(params);
      if (this.id) {
        axios
          .patch(`/about/${this.id}`, params)
          .then((response) => {
            axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt");
            this.$router.push(`/favorites/${response.data.user_id}`);
          })
          .catch((error) => {
            console.log(error.response);
            this.errors = error.response.data.errors;
          });
      } else {
        axios
          .post("/about", params)
          .then((response) => {
            axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt");
            this.$router.push(`/favorites/${response.data.user_id}`);
          })
          .catch((error) => {
            console.log(error.response);
            this.errors = error.response.data.errors;
          });
      }
    },
  },
};
</script>
