<template>
<div>
    <div>サイト名</div>
    <div>
        <div>Eメールアドレス</div>
        <div>
            <input 
            type="email"
            name="email"
            placeholder="email"
            required="required"
            v-model="email"
            />
        </div>
    </div>
    <div>
        <div>パスワード</div>
        <div>
            <input 
            type="password"
            name="password"
            placeholder="password"
            required="required"
            v-model="password"
            />
        </div>
    </div>
    <div>
        <input
        type="submit"
        v-on:click="userSignIn"
        class="button"
        title="Sign In"
        value="Sign In"
        />
    </div>
    <div>
        <div>アカウントお持ちでない方は</div>
        <div>
            <router-link :to="{ name: 'Signup' }">
                サイト名に登録
            </router-link>
        </div>
    </div>
</div>
</template>

<script>
    import firebase from "firebase";
    
    export default {
        data:function(){
            return{
                email:"",
                password:"",
            };
        },
        methods:{
            userSignIn(){
                firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    alert("success");
                    this.$router.push({ path:`/`});
                });
            }
        }
    }
</script>

<style></style>