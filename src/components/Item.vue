<template>
  <div class="itemContainer">
    <router-link to="/">
      <h1>Beer & Chips</h1>
    </router-link>
    <li class="item">
      <div class="user-box">
        <div
          class="avatar"
          :style="'background-image: url(' + user.photoURL + ')'"
        ></div>
        <p class="user-name">{{ user.name }}</p>
      </div>
      <div v-for="(shows, index) in show" :key="index" class="showContainer">
        <div class="date">
          {{ shows.date }}
          <br />
        </div>
        <div>
          {{ shows.time }}
          <br />
        </div>
        <div>
          {{ shows.selected }}
          <br />
        </div>
        <div>
          {{ shows.postContents }}

          <br />
        </div>
        <div v-if="shows.images">
          <img v-bind:src="shows.images" style="width: 1000px; height: 600px" />
        </div>
      </div>
    </li>
  </div>
</template>

<script>
import { db } from "@/firebase.js"
import { auth } from "@/firebase.js"
import firebase from "firebase"
import Vue2Filters from 'vue2-filters'

export default {
  props: ["id", "uid"],
  data() {
    return {
      whisper: {},
      user: {},
      currentUser: {},
      showBtns: false,
      show: [],
    }
  },
  firestore() {
    return {
      whisper: db.collection("whispers").doc(this.$props.id),
      user: db.collection("users"),
      tweets: db.collection("tweets").where("selected", "==", "this.selected"),
    }
  },

  mounted: function () {
    firebase
      .firestore()
      .collection("tweets")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.show.push({
            id: doc.id,
            ...doc.data(),
          })
        })
      })
    auth.onAuthStateChanged((user) => {
      this.currentUser = user
    })
  },
  mixins: [Vue2Filters.mixin]
}
</script>

<style lang="stylus">
.showContainer
 font-size 20px
h1
    width fit-content
    margin 0 auto
    font-size 3.2rem
    font-family cursive
.itemContainer
  background: rgb(255, 255, 255);
  background: linear-gradient(
  to bottom,
  rgba(255, 255, 255, 1) 0%,
  rgba(255, 201, 59, 1) 100%
  );height 100%;
  margin center


.item
  padding-top 25px
  flex-flow column-reverse
  list-style none
  border-top 1px solid #eee
  padding 5px 15px
  display flex
  flex-wrap no-wrap
  justify-content flex-start
  position relative



  .editor
    position relative
    width 100%
    textarea
      background transparent
      resize none
      height 80px
      width 96%
      border none
      padding 10px 2%
      font-size .9rem
      font-weight lighter
      &:focus
        outline none
    .message
      opacity 0
      position absolute
      bottom 5px
      right 10px
      transition .2s
      font-size .8rem
    &:hover
      .message
        opacity 1
  .user-box
    margin 10px 10px 10px 0
    .avatar
      height 50px
      width 50px
      border-radius 50%
      border 1px solid #eee
      background-size cover
    .user-name
      margin 5px 0 0 0
      text-align center
      font-size .7rem
      line-height .7rem
      width 50px
  .content
    padding 10px

  button
    position absolute
    top 5px
    right 0
    background transparent
    color #555
    font-size .9rem
    opacity 0
    transition .2s
  .controls
    background white
    position absolute
    top 5px
    right 35px
    box-shadow 0 0 5px rgba(0,0,0,.05)
    border-radius 3px
    opacity 0
    li
      padding 5px 20px
      border-top 1px solid #eee
      cursor pointer
      &:first-child
        border none
  &:first-child
    border none
  &:hover
    background rgba(0,0,0,.02)
    .content
    button
      opacity 1
    .controls
      opacity 1
</style>
