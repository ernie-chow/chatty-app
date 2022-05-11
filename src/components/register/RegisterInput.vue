<script setup>
import { ref } from 'vue';
import router from "@/router";
import { useToast } from "primevue/usetoast";
import userService from "@/services/user.service";
import * as Yup from "yup";
const toast = useToast();

const schema = Yup.object().shape({
    username: Yup.string().required("A username is required"),
    email: Yup.string().email("A valid email is required").required("An email address is required"),
    password: Yup.string().min(8).required("A password is required"),
    confirmPassword: Yup.string()
        .required("You must confirm your password")
        .oneOf([Yup.ref("password")], "Passwords do not match"),
});

async function onSubmit(values) {
    try {
        // Create user
        const user = {
            "username": values.username,
            "email": values.email,
            "password": values.password,
        }

        const response = await userService.register(user);
        console.log(response.data);
        router.push({ name: "home" });
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

function onInvalidSubmit() {
    // TODO Add styling for invalid form
    console.log("Form invalid");
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
    <div class="d-flex w-100">
        <Card class="rounded-0 shadow-none w-100">
            <template #title>
                <div class="text-center">
                    Register to join our
                    <span class="text-primary">Chatty</span> room
                </div>
            </template>
            <template #subtitle></template>
            <template #content>
                <Form
                    class="d-flex justify-content-center flex-column flex-nowrap"
                    @submit="onSubmit"
                    @invalid-submit="onInvalidSubmit"
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
                            <label for="email">Email address</label>
                            <Field id="email" name="email" type="email" class="w-100 form-control" />
                            <small class="position-absolute">
                                <ErrorMessage name="email" class="text-danger" />
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
                        <div class="col">
                            <label for="confirmPassword">Confirm password</label>
                            <Field
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                class="w-100 form-control"
                            />
                            <small class="position-absolute">
                                <ErrorMessage name="confirmPassword" class="text-danger" />
                            </small>
                        </div>
                    </div>
                    <div class="d-flex justify-content-end">
                        <Button label="Register" type="submit" />
                    </div>
                </Form>
            </template>
        </Card>
    </div>
</template>