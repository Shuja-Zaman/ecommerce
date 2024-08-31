import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default defineNuxtPlugin((nuxtApp) => {

    const config = useRuntimeConfig();

    const firebaseConfig = {
        apiKey: config.public.apiKey,
        authDomain: config.public.authDomain,
        projectId: config.public.projectId,
        storageBucket: config.public.storageBucket,
        messagingSenderId: config.public.senderId,
        appId: config.public.appId,
        measurementId: config.public.measurementId
    };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

nuxtApp.provide('firebase',app);
nuxtApp.provide('firestore',db);

});
