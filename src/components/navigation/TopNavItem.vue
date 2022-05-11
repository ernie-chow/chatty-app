<script setup>
import { RouterLink } from "vue-router";
</script>

<script>
export default {
    props: {
        href: {
            type: String,
            required: true,
        },
    }
};
</script>

<template>
    <li class="top-nav-item-container">
        <router-link active-class="active" :to="href" class="top-nav-item">
            <slot></slot>
        </router-link>
    </li>
</template>
