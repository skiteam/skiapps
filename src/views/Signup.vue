<template>
  <div>
    <div>サイト名</div>
    <div>
      <div>あなたのメールアドレス</div>
      <input  
        type="email"
        name="email"
        placeholder="email"
        required="required"
        v-model="email"/>
    </div>
    <div>
      <div>パスワードを作成</div>
      <input
        type="password" 
        name="password"
        placeholder="password"
        required="required"
        v-model="password"
       />
    </div>
    <!-- <div>
      <div>生年月日</div>
      <div>
        <div>年</div>
        <input type="year" />
        <div>月</div>
        <select name="" id="">
          <option value="Jan">1</option>
          <option value="Feb">2</option>
          <option value="Mar">3</option>
          <option value="Apr">4</option>
          <option value="May">5</option>
          <option value="Jun">6</option>
          <option value="Jul">7</option>
          <option value="Aug">8</option>
          <option value="Sep">9</option>
          <option value="Oct">10</option>
          <option value="Nov">11</option>
          <option value="Dec">12</option>
        </select>
      </div>
    </div> -->
    <div>
        <input 
        type="submit"
        v-on:click="signup()"
        class="button"
        title="Sign Up"
        value="Sign Up"
        />
    </div>
    <div>
        <router-link :to="{ name: 'Signin' }">
            ログインページ
        </router-link>
    </div>
  </div>
</template>

<script>
    import firebase from "firebase";

    //他のファイルに移動させるときに必ず必要
    export default {
        data: function(){
            return {
                email:"",
                password:"",
            };
        },
        methods:{
            //ここのsignupは自分で作ったもの
            signup: function(){firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    alert("success")
                    this.$router.push({ path: `Signin`});
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorCode + ":" + errorMessage);
                });
            }
        }
    }
</script>

<style></style>
