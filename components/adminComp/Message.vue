<template>
  <div class="p-2" v-if="!isLoading">
    <h1 class="small-title">Messages <span>({{ messages.length }})</span></h1>
    <div class="flex flex-col " v-for="message in messages" :key="message.id">
        <h1>{{ message.name }}</h1>
        <p>{{ message.email }}</p>
        <p>{{ message.mobile }}</p>
        <p class="text-sky-700">{{ message.message }}</p>
        <hr class="my-2">
    </div>
  </div>
</template>

<script setup>
import { collection, getDocs } from "firebase/firestore";
const messages = ref([]);
const nuxtApp = useNuxtApp();
const db = nuxtApp.$firestore;
const isLoading = ref(true);

const fetchMessages = async () => {
        try {
            const messageRef = await getDocs(collection(db,'messages'));
            messages.value = messageRef.docs.map( doc => ({
                id:doc.id,
                ...doc.data()
            }));
            console.log(messages.value)
        } catch (error) {
            console.error('Error fetching Messages: ',error);
        }finally{
            isLoading.value = false;
        }

};


onMounted(() => {
    fetchMessages();
});
</script>

<style>

</style>