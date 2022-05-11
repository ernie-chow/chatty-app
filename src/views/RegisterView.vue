<script setup>
import RegisterInput from "@/components/register/RegisterInput.vue";

</script>

<script>
export default {

};
</script>

<template>
    <div class="d-flex justify-content-center h-100">
        <div class="register-view-container d-flex rounded shadow-sm overflow-hidden">
            <div class="d-flex flex-column bg-dark text-light p-3">
                <div class="logo-container text-light">
                    <i class="pi pi-comment"></i>
                    <div class="logo-text">Chatty</div>
                </div>
                <div class="h5 text-center">Get started here</div>
            </div>

            <RegisterInput />
        </div>
    </div>
</template>
