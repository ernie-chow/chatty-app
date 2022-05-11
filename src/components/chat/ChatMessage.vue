<script setup>
const props = defineProps({
    username: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
});

defineExpose({
    props
});
</script>

<template>
    <div class="chat-message" :class="username === sender ? 'own-chat-message' : ''">
        <div class="message-sender">{{ sender }}</div>
        <div class="message-timestamp">{{ timestamp.getHours().toString().padStart(2, "0") }}:{{
                timestamp.getMinutes().toString().padStart(2, "0")
        }}</div>
        <div class="message-body">{{ message }}</div>
    </div>
</template>