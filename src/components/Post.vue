<template>
  <div class="container">
    <div class="time">
      {{ this.date }}
      {{ this.time }}
    </div>
    <select v-model="selected">
      <option disabled value="">Please select one</option>
      <option>#Beer</option>
      <option>#Chips</option>
      <option>#Both</option>
    </select>
    <p class="apearingWords">
      <span>{{ selected }}</span>
    </p>

    <div class="format">
      <textarea
        type="text"
        rows="5"
        maxlength="1000"
        v-model="postContents"
        placeholder="Write here！"
      />
      <p>
        <label class="selectFiles">
          <input
            type="file"
            ref="preview"
            v-on:change="selectImage"
            class="selectPictures"
            name="file"
            accept="image/jpeg, image/png"
            multiple
          />
          Select files
        </label>
      </p>

      <div class="picture" v-if="seen">
        <img
          :src="url"
          alt="選択された画像"
          style="width: 300px; height: 180px"
          class="image"
        />
        <div v-on:click="removeImg">×</div>
      </div>
    </div>
    <div class="postingButton">
      <input type="submit" v-on:click="post" class="posting" value="Post!" />
    </div>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  data() {
    return {
      saveImage: null,
      selected: "",
      postContents: "",
      seen: false,
      images: null,
      tweets: [],
      url: "",
      item: null,
      uid: null,
      date: "",
      time: "",
      week: ["(Sun)", "(Mon)", "(Tu)", "(Wed)", "(Thu)", "(Fri)", "(Sat)"],
      timerID: null,
    }
  },
  methods: {
    post: async function () {
      if (this.uid !== null) {
        if (this.saveImage !== null) {
          const storageRef = firebase.storage().ref()
          const createdAdd = new Date()
          const timeStamp = createdAdd.getTime()
          const fileName = timeStamp + this.saveImage.name
          const fileRef = storageRef.child("images/" + fileName)
          await fileRef
            .put(this.saveImage)
            .then(() => fileRef.getDownloadURL())
            //  .then((photoURL)=>
            //  console.log(photoURL))
            .then((photoUrl) => {
              this.images = photoUrl
            })
            .catch(function (error) {
              console.log(error)
            })
        }
        if (this.saveImage !== null) {
          this.item = {
            date: this.date,
            time: this.time,
            id: this.uid,
            selected: this.selected,
            postContents: this.postContents,
            images: this.images,
            // photoUrl:this.photoUrl
          }
        } else {
          this.item = {
            date: this.date,
            time: this.time,
            id: this.uid,
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
      } else {
        alert("ログインしてください！")
      }
    },
    selectImage: function (e) {
      this.seen = true
      this.url = URL.createObjectURL(this.$refs.preview.files[0])
      this.saveImage = e.target.files[0]
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
    },
    updateTime: function () {
      let currentdate = new Date()
      this.time =
        this.zeroPadding(currentdate.getHours(), 2) +
        ":" +
        this.zeroPadding(currentdate.getMinutes(), 2) +
        ":" +
        this.zeroPadding(currentdate.getSeconds(), 2)
      this.date =
        this.zeroPadding(currentdate.getFullYear(), 4) +
        "/" +
        this.zeroPadding(currentdate.getMonth() + 1, 2) +
        "/" +
        this.zeroPadding(currentdate.getDate(), 2) +
        "/" +
        this.week[currentdate.getDay()]
    },
    zeroPadding: function (num, len) {
      let zero = ""
      for (var i = 0; i < len; i++) {
        zero += "0"
      }
      return (zero + num).slice(-len)
    },
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
    this.timerID = setInterval(this.updateTime, 1000)
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.uid = user.uid
    })
  },
}
</script>

<style>
.container {
  margin: 30px;

  background: rgb(255, 255, 255);
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 201, 59, 1) 100%,
    rgba(0, 212, 255, 1) 100%
  );
}
.format {
}

select {
  background: rgb(255, 249, 231);

  width: 200px;
  height: 20px;

  margin: 50px 0px;
}
.apearingWords {
  margin: 14px 0px;
}
textarea {
  background: rgb(255, 238, 202);

  resize: none;
  width: 500px;
  height: 100px;
}
.selectPictures {
  display: none;
}
.selectFiles {
  background: rgb(255, 239, 195);
}
.postingButton {
  margin: 50px;
}
.posting {
  background: #ffd803;
}
</style>
