<template>
  <div class="container">
    <select v-model="selected">
      <option disabled value="">Please select one</option>
      <option>#ビール</option>
      <option>#おつまみ</option>
      <option>#どっちも</option>
    </select>
    <p>
      <span>{{ selected }}</span>
    </p>

    <div class="format">
      <textarea
        type="text"
        rows="5"
        maxlength="1000"
        v-model="postContents"
        placeholder="書いてみよう！"
      />
      <p>
        <input
          type="file"
          ref="preview"
          v-on:change="selectImage"
          name="file"
          accept="image/jpeg, image/png"
          multiple
        />
      </p>

      <div class="picture" v-if="seen">
        <!-- <div v-for="(image, index) in images" v-bind:key="index"> -->
          <!-- {{ index }}:{{ image }} -->
        <img :src="url" alt="選択された画像" style="width: 300px; height: 180px" class="image" />
         <!-- </div> -->
        <div v-on:click="removeImg">×</div>
      </div>
    </div>
    <div>
      <input type="submit" v-on:click="post" class="posting" value="投稿" />
    </div>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  data() {
    return {
      saveImage:null,
      selected: "",
      postContents: "",
      seen: false,
      images: null,
      tweets: [],
      url:"",
      item:null,
      uid:null,
    }
  },
  methods: {
     post:async function() {
      if(this.uid!==null){
      if(this.saveImage!==null){
        const storageRef=firebase.storage().ref()
        const createdAdd=new Date()
        const timeStamp=createdAdd.getTime()
        const fileName=timeStamp+this.saveImage.name
        const fileRef=storageRef.child("images/"+fileName)
         await fileRef
         .put(this.saveImage)
         .then(()=>fileRef.getDownloadURL())
          //  .then((photoURL)=>
          //  console.log(photoURL))
            .then((photoUrl) => {
        this.images=photoUrl;
      })
      .catch(function(error) {
          console.log(error)
      });
      }
      if(this.saveImage!==null){
       this.item = {
        id:this.uid,
        selected: this.selected,
        postContents: this.postContents,
        images: this.images,
        // photoUrl:this.photoUrl
      }
      }else{
        this.item={
         id:this.uid,
         selected: this.selected,
         postContents: this.postContents,
        }
      }
      firebase
        .firestore()
        .collection("tweets")
        .add(this.item)
        .then((ref) => {
          this.tweets.push({
            id: ref.id,
            ...this.item,
          })
        })
      this.$router.push({ name: "Home" })
      }else{
        alert("ログインしてください！")
      }
    },
    selectImage: function (e) {
      this.seen = true
      this.url = URL.createObjectURL(this.$refs.preview.files[0])
        // const imageFile=e.target.files[0]
        // this.saveImage.push(imageFile[0])
        
        this.saveImage=e.target.files[0]
        console.log(this.saveImage)
    
      
    },
    removeImg(index) {
      if (this.$refs.preview && this.$refs.preview.value !== undefined) {
        this.$refs.preview.value = ""
        this.images.splice(index, 1)
      }
      if (this.images[0] == undefined) {
        this.seen = false
      }
    }
  },
  mounted: function () {
    firebase
      .firestore()
      .collection("tweets")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.tweets.push({
            id: doc.id,
            ...doc.data(),
          })
        })
      })
  },
  created(){
     firebase.auth().onAuthStateChanged((user) => {
      this.uid=user.uid
    })
  }

}
</script>

<style></style>
