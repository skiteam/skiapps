<template>
  <div class="container">
    <select v-model="selected">
      <option disabled value="">Please select one</option>
      <option>beer</option>
      <option>chips</option>
      <option>both</option>
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
        <div v-for="(image, index) in images" v-bind:key="index">
          <!-- {{ index }}:{{ image }} -->
          <img :src="image" alt="selected pictures" class="image" />
        </div>
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
      selected: "",
      postContents: "",
      seen: false,
      images: [],
      tweets: [],
    }
  },
  methods: {
    post() {
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
  },

  created: function () {
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
</script>

<style>
.container {
  margin: 30px;
}
.format {
}

select {
  background: #bae8e8;

  width: 200px;
  height: 20px;

  margin: 50px 0px;
}
.apearingWords {
  margin: 14px 0px;
}
textarea {
  background: #bae8e8;

  resize: none;
  width: 500px;
  height: 100px;
}
.selectPictures {
  display: none;
}
.selectFiles {
  background: #bae8e8;
}
.postingButton {
  margin: 50px;
}
.posting {
  background: #ffd803;
}
</style>
