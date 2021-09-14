<template>
  <header>
    <div v-if="currentUser" class="btns" style="z-index:2147483647">
      <router-link to="/post">
        <button class="pen">✎</button>
      </router-link>

      <button
        :style="'background-image: url(' + currentUser.photoURL + ')'"
      ></button>

      <button>
        <fa icon="sign-out-alt" @click="signOut" />
      </button>
    </div>
    <div v-else class="btns">
      <button>
        <fa icon="user" @click="signIn" />
      </button>
    </div>
  </header>
</template>
<script>
import firebase from "firebase"
import { auth } from "@/firebase.js"
import { db } from "@/firebase.js"

export default {
  data() {
    return {
      currentUser: {},
    }
  },
  created() {
    auth.onAuthStateChanged((user) => {
      this.currentUser = user
    })
  },
  methods: {
    signIn() {
      const provider = new firebase.auth.GoogleAuthProvider()
      auth.signInWithPopup(provider).then((result) => {
        alert("こんにちは " + result.user.displayName + "さん!")
        this.createUser(result.user)
      })
    },
    createUser(user) {
      db.collection("users").doc(user.uid).set(
        {
          name: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
        },
        { merge: true }
      )
    },
    signOut() {
      if (window.confirm("本当にログアウトしますか？")) {
        auth.signOut().then(() => {
          alert("正常にログアウトされました")
          this.$router.push("/"), location.reload()
        })
      }
    },
  },
}
</script>
<style lang="stylus" scoped>
header
  z-index 2
  position fixed
  top 0
  width 100%
  text-align center
  padding 10px

  .btns
    position absolute 
    z-index 2147483647
    top 10px
    right 30px
    cursor pointer
    img
      width 100%
  .pen
   font-size 28px
</style>
