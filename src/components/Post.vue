<template>
 <div class="container">
    <div class="buttons">
        <button v-on:click="makeTag" class="alcohol">ビール</button>
        <button v-on:click="makeTag1" class="appetizer">おつまみ</button>
        <button v-on:click="makeTag2" class="both">どっちも</button>
    </div>
<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>#ビール</option>
  <option>#おつまみ</option>
  <option>#どっちも</option>
</select>
<p>
<span>{{ selected }}</span>
    <div class="format">
        <input type="text" rows="1" maxlength="5" v-model="tagvalue" placeholder="↑で選択" />
        <br>    
        <textarea type="text" rows="5" maxlength="1000" v-model="postContents" placeholder="書いてみよう！" />
        <p>
        <input type="file"  ref="preview" v-on:change="selectImage" name="file" accept="image/jpeg, image/png" multiple />
        <div class="picture" v-if="selectedImageUrl">
            <!-- <img v-for="selectedImageUrl in files" :key="selectedImageUrl"> -->
            <img :src="selectedImageUrl" alt="選択された画像" class="image">
        </div>
        <div> 
            <input type="submit" v-on:click="post" class="posting" value="投稿"> 
        </div>   
    </div>
 </div>
  
</template>

<script>
import firebase from "firebase";

export default {
    data() {
    return {
      selected:"",
      tagvalue:"",
      postContents: "",
      selectedImageUrl: "",
      images:[],
      tweets: [],
    }
  },
  methods: {
      post(){
          const item = {
              selected:this.selected,
              postContents:this.postContents,
              selectedImageUrl:this.selectedImageUrl,
              photos:this.images,
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
      selectImage:function(){
         const file = this.$refs.preview.files[0]
         this.selectedImageUrl = URL.createObjectURL(file)
         const Image=URL.createObjectURL(file)
         this.images.push(Image)
         },
      makeTag:function(){
          this.tagvalue=""
          const tag="#ビール"
          this.tagvalue=tag
      },
      makeTag1:function(){
          this.tagvalue=""
          const tag="#おつまみ"
          this.tagvalue=tag
      },
      makeTag2:function(){
          this.tagvalue=""
          const tag="#どっちも"
          this.tagvalue=tag
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