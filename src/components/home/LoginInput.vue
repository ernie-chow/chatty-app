<script setup>
import { ref } from 'vue';
import router from "@/router";
import userService from "@/services/user.service";
import { useToast } from "primevue/usetoast";
import * as Yup from "yup";
const toast = useToast();

const schema = Yup.object().shape({
    username: Yup.string().required("A username is required"),
    password: Yup.string().min(8).required("A password is required"),
});

async function onSubmit(values) {
    try {
        // Create user
        const user = {
            "username": values.username,
            "password": values.password
        }

        const response = await userService.login(user);
        router.push({ name: "chat" });
    } catch (error) {
        if (error.response) {
            var errorDetail = "The username or password entered is incorrect, please try again.";
            toast.add({ severity: "error", summary: "Error", detail: errorDetail });
        } else if (error.request) {
            toast.add({ severity: "error", summary: "Error", detail: error.request });
        } else {
            toast.add({ severity: "error", summary: "Error", detail: error.message });
        }
    }
}
</script>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
};
</script>

<template>
    <Toast />
    <div class="login-container">
        <Card class="shadow-none w-100">
            <template #header>
                <div class="logo-container">
                    <i class="pi pi-comment"></i>
                    <div class="logo-text">Chatty</div>
                </div>
            </template>
            <template #title>
                <div class="text-center">
                    Join our
                    <span class="text-primary">Chatty</span> room here
                </div>
            </template>
            <template #subtitle></template>
            <template #content>
                <Form
                    class="d-flex justify-content-center flex-column flex-nowrap"
                    @submit="onSubmit"
                    :validation-schema="schema"
                >
                    <div class="row">
                        <div class="col">
                            <label for="username">Username</label>
                            <Field
                                id="username"
                                name="username"
                                type="text"
                                class="w-100 form-control"
                            />
                            <small class="position-absolute">
                                <ErrorMessage name="username" class="text-danger" />
                            </small>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label for="password">Password</label>
                            <Field
                                id="password"
                                name="password"
                                type="password"
                                class="w-100 form-control"
                            />
                            <small class="position-absolute">
                                <ErrorMessage name="password" class="text-danger" />
                            </small>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center mt-3">
                        <Button icon="pi pi-comments" label="Start Chatting" type="submit" />
                    </div>
                </Form>
            </template>
        </Card>
    </div>
</template>