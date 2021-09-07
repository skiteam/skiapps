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
          {{ index }}:{{ image }}
        <img :src="image" alt="選択された画像" class="image" />
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
      selectedImage: "",
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
        photos: this.images,
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
    },
    selectImage: function () {
      this.seen = true
      const file = this.$refs.preview.files[0]
      this.selectedImage = URL.createObjectURL(file)
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
        snapshot.docs.forEach((doc) => {
          this.tweets.push({
            id: doc.id,
            ...doc.data(),
          })
        })
      })
  },
}
</script>

<style></style>
