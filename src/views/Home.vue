<template>
  <div>
    <input 
    type="submit" 
    class="button"
    title="Sign out"
    value="Sign out"
    v-on:click="signout"
    />
  </div>
</template>
<script>
  import firebase from "firebase";

  export default {
    methods:{
    signout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("ログアウトしました");
          this.router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    }
  }
</script>

<style>
</style>
