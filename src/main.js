import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Textarea from "primevue/textarea";
import Card from "primevue/card";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import { Field, Form } from "vee-validate";

// Styling
import "primevue/resources/themes/tailwind-light/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "@/assets/css/app.css";

const app = createApp(App);

app.use(router);
app.use(PrimeVue);
app.use(ToastService);

// PrimeVue components
app.component("InputText", InputText);
app.component("Button", Button);
app.component("Textarea", Textarea);
app.component("Card", Card);
app.component("Toast", Toast);

// Vee Validate components
app.component("Form", Form);
app.component("Field", Field);

// Global variables
app.provide("$chattyApiUrl", import.meta.env.VITE_CHATTY_API_URL_STRING);

app.mount("#app");
