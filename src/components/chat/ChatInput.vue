<script setup>
import { ref } from "vue";
import messageService from "@/services/message.service";
import { useToast } from "primevue/usetoast";
const toast = useToast();

// Update every x seconds to get chat messages
const emit = defineEmits({
    messageSent() {
        return true;
    }
});

const props = defineProps({
    username: {
        type: String,
        required: true
    }
});

const messageBody = ref("");
const messageId = ref("");

async function sendMessage(e) {
    const input = e.target;
    if (input.value !== "") {
        try {
            // Create message
            const message = {
                "messageBody": messageBody.value,
                "sender": props.username,
                "sentAt": new Date().toISOString()
            };

            clearInput(e);
            const response = await messageService.sendMessage(message);
            messageId.value = response.data.messageId;

            // Fetch new messages
            emit("messageSent");
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
}

function clearInput(e) {
    const input = e.target;
    input.value = "";
    input.style.height = "80px";
}
</script>

<template>
    <Toast />
    <div class="chat-input">
        <Textarea v-model="messageBody" :autoResize="true" @keydown.enter.prevent="sendMessage"
            placeholder="Press enter to send your message" />
    </div>
</template>