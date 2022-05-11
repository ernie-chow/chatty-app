<script setup>
import router from "vue-router";
import { RouterLink } from "vue-router";
import userService from "@/services/user.service";

const loggedInUser = JSON.parse(localStorage.getItem("user"));

function logoutUser() {
    userService.logout();
    router.push({ name: "home" });
}
</script>

<template>
    <nav class="top-nav">
        <router-link to="/" class="logo-container">
            <i class="pi pi-comment"></i>
            <div class="logo-text">Chatty</div>
        </router-link>
        <ul class="top-nav-links">
            <slot></slot>
            <li id="logoutButton" class="top-nav-item-container" v-if="loggedInUser">
                <a class="top-nav-item" @click="logoutUser" href="#">Logout</a>
            </li>
        </ul>
    </nav>
</template>