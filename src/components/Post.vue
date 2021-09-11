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
        <div v-for="(image, index) in images" v-bind:key="index">
          <!-- {{ index }}:{{ image }} -->
        <img :src="image" alt="選択された画像" style="width: 300px; height: 180px" class="image" />
         </div>
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
      images: [],
      tweets: [],
    }
  },
  methods: {
     post:async function() {
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
        this.images = photoUrl;
      })
      .catch(function(error) {
          console.log(error)
      });
      const item = {
        selected: this.selected,
        postContents: this.postContents,
        images: this.images,
      }
      firebase
        .firestore()
        .collection("tweets")
        .add(item)
        .then((ref) => {
          this.tweets.push({
            id: ref.id,
            ...item,
          })
        })
      this.$router.push({ name: "Home" })
    }
     },
    selectImage: function () {
      this.seen = true
      const file = this.$refs.preview.files[0]
      const Image = URL.createObjectURL(file) 
      this.images.push(Image)
    },
    removeImg(index) {
      if (this.$refs.preview && this.$refs.preview.value !== undefined) {
        this.$refs.preview.value = ""
        this.images.splice(index, 1)
      }
      if (this.images[0] == undefined) {
        this.seen = false
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
}
}
</script>

<style></style>
