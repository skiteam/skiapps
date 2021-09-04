<template>
 <div class="container">
    <div class="buttons">
        <button class="alcohol">お酒</button>
        <button class="appetizer">おつまみ</button>
        <button class="both">どっちも</button>
    </div>
    <div class="format">
        <textarea type="text" rows="5" maxlength="1000" v-model="postContents" />
        <p>
        <input type="file"  ref="preview" v-on:change="selectImage" name="file" accept="image/jpeg, image/png" multiple>

        <div class="picture" v-if="selectedImageUrl">
            <img :src="selectedImageUrl" alt="選択された画像" class="image">
        </div>
        <div> 
            <input type="submit" v-on:click="post" class="posting" value="投稿"> 
            
            <!-- <textarea v-model="text"/>
            <button v-on:click="postTweet">ツイート</button>
             <p v-for="item in tweets" :key="item.id">
              {{item.text}}
            </p> -->
        </div>   
    </div>
 </div>
  
</template>

<script>
import firebase from "firebase";

export default {
    data() {
    return {
      postContents: "",
      selectedImageUrl: "",
      tweets: [],
    }
  },
  methods: {
      post(){
          const item = {
              postContents:this.postContents,
              selectedImageUrl:this.selectedImageUrl,
          };
              firebase.firestore().collection("tweets")
        .add(item)
        .then(ref => {
          this.tweets.push({
            id: ref.id,
            ...item
          });
        });
          },
      
    //   postTweet() {
    // const item = {
    //     text:this.text 
    //   };
    //     firebase.firestore().collection("tweets")
    //     .add(item)
    //     .then(ref => {
    //       this.tweets.push({
    //         id: ref.id,
    //         ...item
    //       });
    //     });
    //   },
      selectImage:function(){
         console.log(this.$refs.preview.files[0])
         const file = this.$refs.preview.files[0];
         this.selectedImageUrl = URL.createObjectURL(file)
      },
   created: function(){
      firebase
      .firestore()
      .collection("tweets")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          this.tweets.push({
            id: doc.id,
            ...doc.data()
          });
        });
      });
  },
  }
}



</script>

<style>

</style>