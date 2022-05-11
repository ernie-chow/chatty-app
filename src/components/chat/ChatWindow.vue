<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import ChatMessages from "@/components/chat/ChatMessages.vue";
import ChatInput from "@/components/chat/ChatInput.vue";

const loggedInUser = JSON.parse(localStorage.getItem("user"));

const chatMessages = ref(null);
const refreshMessages = ref();

onMounted(() => {
    refreshMessages.value = setInterval(() => {
        loadMessages();
    }, 3000);
});

onUnmounted(() => clearInterval(refreshMessages.value));

function loadMessages() {
    chatMessages.value.getMessages();
}
</script>

<template>
    <div class="chat-window">
        <!-- TODO Add ChatUsers component -->
        <ChatMessages :username="loggedInUser.username" ref="chatMessages" />
        <div class="chat-users">Currently chatting as {{ loggedInUser.username }}</div>
        <ChatInput :username="loggedInUser.username" @messageSent="loadMessages" />
    </div>
</template>