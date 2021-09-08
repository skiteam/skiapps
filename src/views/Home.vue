<template>
  <div class="home">
    <div class="list">
      <Item
        v-for="whisper in orderBy(whispers, 'date', -1)"
        :key="whisper.id"
        :id="whisper.id"
        :uid="whisper.uid"
      />
    </div>
    <div>
      <input
        type="submit"
        class="button"
        title="Sign out"
        value="Sign out"
        v-on:click="signout"
      />
    </div>
  </div>
</template>

<script>
import Item from "@/components/Item.vue"
import { db } from "@/firebase.js"
import Vue2Filters from "vue2-filters"
import firebase from "firebase"

export default {
  name: "home",
  components: {
    Item,
  },

  data() {
    return {
      whispers: [],
    }
  },
  firestore() {
    return {
      whispers: db.collection("whispers"),
    }
  },
  mixins: [Vue2Filters.mixin],
  methods: {
    signout: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("ログアウトしました")
          this.router.push("/")
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },

}
</script>
<style lang="stylus" scoped>
.item
  list-style none
  border-top 1px solid #eee
  padding 5px 15px
  display flex
  flex-wrap no-wrap
  justify-content flex-start
  position relative
  &:first-child
    border none
  &:hover
    background rgba(0,0,0,.02)
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
</style>
