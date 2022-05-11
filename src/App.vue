<script setup>
import { RouterView } from "vue-router";
import TopNav from "@/components/navigation/TopNav.vue";
import TopNavItem from "@/components/navigation/TopNavItem.vue";
import { inject } from "vue";

const currentYear = new Date().getFullYear();

console.log(inject("$chattyApiUrl"));
</script>

<template>
    <div class="page-grid">
        <TopNav>
            <TopNavItem href="/">Home</TopNavItem>
            <TopNavItem href="/about">About</TopNavItem>
            <TopNavItem href="/register">Register</TopNavItem>
        </TopNav>

        <main class="main-content">
            <RouterView v-slot="{ Component }">
                <Transition name="fade" mode="out-in">
                    <Component :is="Component" />
                </Transition>
            </RouterView>
        </main>

        <div class="footer">&copy; Chatty {{ currentYear }}</div>
    </div>
</template>

<style>
/* @import "@/assets/css/app.css"; */
</style>
