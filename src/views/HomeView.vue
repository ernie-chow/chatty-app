<script setup>
import { ref } from "vue";
import LoginInput from "@/components/home/LoginInput.vue";

const usernameValue = ref("N/A");
</script>

<script>
export default {

};
</script>

<template>
  <div class="d-flex align-items-center justify-content-center h-100">
    <LoginInput @usernameChosen="(username) => usernameValue = username" />
  </div>
</template>
