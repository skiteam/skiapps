<template>
 <div class="container">
    <div class="buttons">
        <button class="alcohol">お酒</button>
        <button class="appetizer">おつまみ</button>
        <button class="both">どっちも</button>
    </div>
    <div class="format">
        <!-- <textarea type="text" rows="5" maxlength="1000" v-model="postContents" />
        <p>
        <input type="file" v-on:change="selectImage" name="file" accept="image/jpeg, image/png" multiple>

        <div class="picture" v-if="selectedImage">
            <img:sre="selectedImage" alt="選択された画像" class="image">
        </div> -->
        <div> 
            <!-- <input type="button" class="posting" value="投稿">  -->
            
            <textarea v-model="text"/>
            <button v-on:click="postTweet">ツイート</button>
             <p v-for="item in tweets" :key="item.id">
              {{item.text}}
            </p>
        </div>   
    </div>
 </div>
  
</template>

<script>
import firebase from "firebase";

export default {
    data() {
    return {
      text:"",
    //   postContents: "",
    //   selectedImage: null,
      tweets: [],
    }
  },
  methods: {
      postTweet() {
    const item = {
        text:this.text 
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
    //   getFileAsBase64 : function(filePath) {
    //         return new Promise((resolve, reject) => {
    //             const reader = new FileReader();
    //             reader.onload = e => resolve(e.target.result);
    //             reader.onerror = error => reject(error);
    //             reader.readAsDataURL(filePath);
    //             })
    //     },  
    //   selectImage:function(e){
    //       let files = e.target.files;
    //         e.preventDefault();
    //          if(files && files.length > 0){
    //              this.getFileAsBase64(files[0])
    //             .then((imgDataBase64)=>{
    //                 this.selectedImage = imgDataBase64;
    //             });
    //   }
    //   },
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
  }
  },

}

</script>

<style>

</style>