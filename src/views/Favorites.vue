<template>
  <div class="favorites">
    <br />
    <br />

    <div class="center">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="d-grid gap-0 col-18 mx-auto">
              <div id="complete" class="progress" style="height: 10px">
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
        </div>
      </div>
    </div>

    <!-- <div class="center">
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
    </div> -->
    <br />
    <div>
      <h1 class="title" style="color: #e24c27">Your favorites</h1>
    </div>

    <div class="center">
      <form v-on:submit.prevent="submit()" :action="`/goals/${this.user_id}`">
        <div class="mb-3">
          <label for="" class="form-label">Drinks</label>
          <div v-for="drink in drinks" v-bind:key="drink.id">
            <input type="text" class="form-control" v-model="drink.description" />
          </div>
          <form :action="`/goals/${this.user_id}`">
            <button v-on:click="addDrinkField()" style="color: #e24c27" type="button" class="btn btn-light">
              +Add another
            </button>
          </form>
        </div>

        <div class="mb-3">
          <label for="" class="form-label">Snacks</label>
          <div v-for="snack in snacks" v-bind:key="snack.id">
            <input type="text" class="form-control" v-model="snack.description" />
          </div>
          <form action="">
            <button v-on:click="addSnackField()" style="color: #e24c27" type="button" class="btn btn-light">
              +Add another
            </button>
          </form>
        </div>

        <div class="mb-3">
          <label for="" class="form-label">People</label>
          <div v-for="person in people" v-bind:key="person.id">
            <input type="text" class="form-control" v-model="person.description" />
          </div>
          <form action="">
            <button v-on:click="addPersonField()" style="color: #e24c27" type="button" class="btn btn-light">
              +Add another
            </button>
          </form>
        </div>
        <br />

        <div class="container">
          <div class="row">
            <div class="col">
              <form :action="`/about/${this.user_id}`">
                <div class="d-grid gap-0 col-13 mx-auto">
                  <button type="submit" class="btn btn-secondary btn-sm" :action="`/about/${this.user_id}`">
                    Back
                  </button>
                </div>
              </form>
            </div>
            <div class="col">
              <div class="d-grid gap-2 col-13 mx-auto">
                <button type="submit" class="btn btn-primary btn-sm btn-block" :action="`/goals/${this.user_id}`">
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
.btn-light {
  background-color: #fafcfe !important;
}

.btn-secondary {
  background-color: #dadada !important;
  color: #404040;
}
#complete {
  background-color: red !important;
}
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      user_id: this.$route.params.id,
      id: null,
      drinks: [{ user_id: this.$route.params.id, category: "drink", description: "" }],
      snacks: [{ user_id: this.$route.params.id, category: "snack", description: "" }],
      people: [{ user_id: this.$route.params.id, category: "person", description: "" }],
    };
  },
  mounted: function () {
    this.userShow();
  },
  created: function () {},

  methods: {
    addDrinkField: function () {
      this.drinks.push({
        user_id: this.user_id,
        category: "drink",
        description: "",
      });
    },
    addSnackField: function () {
      this.snacks.push({
        user_id: this.user_id,
        category: "snack",
        description: "",
      });
    },
    addPersonField: function () {
      this.people.push({
        user_id: this.user_id,
        category: "person",
        description: "",
      });
    },
    userShow: function () {
      axios.get(`/users/${this.user_id}`).then((response) => {
        console.log(response.data);

        // get user's drinks
        if (response.data.favorites.drinks) {
          console.log("userShow ->", response.data);

          var userDrinks = {};
          var i = 0;
          while (i < response.data.favorites.drinks.length) {
            userDrinks[i] = response.data.favorites.drinks[i];
            i++;
          }
          this.drinks = userDrinks;
          console.log("drinks", userDrinks);
        }

        // get user's snacks
        if (response.data.favorites.snacks) {
          var userSnacks = [];
          i = 0;
          while (i < response.data.favorites.snacks.length) {
            userSnacks[i] = response.data.favorites.snacks[i];
            i++;
          }
          console.log("snacks", userSnacks);
          this.snacks = userSnacks;
        }

        // get user's people
        if (response.data.favorites.people) {
          var userPeople = [];
          i = 0;
          while (i < response.data.favorites.people.length) {
            userPeople[i] = response.data.favorites.people[i];
            i++;
          }

          console.log("people", userPeople);
          this.people = userPeople;
        } else {
          console.log("else");
        }
      });
    },
    submit: function () {
      var params = {
        user_id: this.$route.params.id,
        // id: null,
        drinks: this.drinks,
        snacks: this.snacks,
        people: this.people,
      };
      console.log(params);
      if (this.id) {
        axios
          .patch(`/favorites/${this.id}`, params)
          .then((response) => {
            axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt");
            this.$router.push(`/goals/${response.data.user_id}`);
          })
          .catch((error) => {
            console.log(error.response);
            this.errors = error.response.data.errors;
          });
      } else {
        axios
          .post("/favorites", params)
          .then((response) => {
            axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt");
            this.$router.push(`/goals/${response.data.user_id}`);
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
