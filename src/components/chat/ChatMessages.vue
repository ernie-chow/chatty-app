<script setup>
import { ref, defineExpose } from "vue";
import messageService from "@/services/message.service";
import ChatMessage from "@/components/chat/ChatMessage.vue";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const props = defineProps({
    username: {
        type: String,
        required: true
    }
});

const messages = ref();
const loading = ref(true);

function updateLoadingStatus() {
    if (messages.value === undefined) {
        loading.value = true;
    } else {
        loading.value = false;
    }
}

async function getMessages() {
    try {
        updateLoadingStatus();
        const response = await messageService.getMessages();
        messages.value = response.data.reverse();
        updateLoadingStatus();
    } catch (error) {
        if (error.response) {
            var errorDetail = error.response.data + "\n" + error.response.status + "\n" + error.response.headers;
            toast.add({ severity: "error", summary: "Error", detail: errorDetail });
        } else if (error.request) {
            toast.add({ severity: "error", summary: "Error", detail: error.request });
        } else {
            toast.add({ severity: "error", summary: "Error", detail: error.message });
        }
    }
}

defineExpose({
    getMessages
});
</script>

<template>
    <Toast />
    <div id="chatMessages" class="chat-messages">
        <!-- Ajax request to get messages then enumerate in here using ChatMessage.vue (new) -->
        <div class="loading-spinner" v-if="loading">
            <i class="pi pi-spin pi-spinner"></i>
        </div>
        <div v-for="(message, index) in messages" :key="index" v-else>
            <ChatMessage :username="props.username" :sender="message.sender" :message="message.messageBody"
                :timestamp="new Date(message.sentAt)" />
        </div>
    </div>
</template>