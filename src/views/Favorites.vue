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
      <h1 class="title" style="color: #e24c27">Your favorites</h1>
    </div>

    <div class="center">
      <div class="mb-3">
        <label for="" class="form-label">Drinks</label>
        <input type="text" class="form-control" v-model="drinks" />
      </div>
      <form v-on:submit.prevent="submit()">
        <div>
          <!-- <input
            v-for="drink in drinks"
            v-bind:key="drink.description"
            type="text"
            class="form-control"
            v-model="drinks"
          /> -->
          <form action="">
            <!-- \/  need to add v-on:click="addField()" functionality \/ -->
            <button style="color: #e24c27" type="button" class="btn btn-light">+Add another</button>
          </form>
        </div>

        <div class="mb-3">
          <label for="" class="form-label">Snacks</label>
          <input type="text" class="form-control" v-model="snacks" />
        </div>
        <div>
          <!-- <input
            v-for="snack in snacks"
            v-bind:key="snack.description"
            type="text"
            class="form-control"
            v-model="snacks"
          /> -->
          <form action="">
            <!-- \/  need to add v-on:click="addField()" functionality \/ -->
            <button style="color: #e24c27" type="button" class="btn btn-light">+Add another</button>
          </form>
        </div>

        <div class="mb-3">
          <label for="" class="form-label">People</label>
          <input type="text" class="form-control" v-model="people" />
        </div>
        <div>
          <!-- <input
            v-for="person in people"
            v-bind:key="person.description"
            type="text"
            class="form-control"
            v-model="people"
          /> -->
          <form action="">
            <!-- \/  need to add v-on:click="addField()" functionality \/ -->
            <button style="color: #e24c27" type="button" class="btn btn-light">+Add another</button>
          </form>
        </div>
        <br />
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
    // addField: function () {
    //   this.drinks.push({ description: "" });
    // },
    userShow: function () {
      console.log(this.user);
      axios.get("/users/:id").then((response) => {
        console.log("userShow ->", response.data);
        console.log("#1", response.data.favorites.drinks[0].description);

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
