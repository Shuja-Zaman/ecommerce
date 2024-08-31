<template>
  <div class="pt-32 text-light">
    
    <div v-if="isLoading" class="bg-sky-500 animate-spin h-8 w-8 absolute z-40 left-0 right-0 ml-auto mr-auto top-1/2"></div>

    <h1 v-bind:class="isLoading ? 'dimmed' : '' " class="text-center title">Categories</h1>

    <div v-if="!isLoading" class="categories grid lg:grid-cols-4 sm:grid-cols-1 p-4 gap-5 mt-5 ">
        <NuxtLink class="text-center h-[20rem] w-3/4 overflow-hidden m-auto rounded-lg shadow-xl shadow-sky-900" v-for="category in categories" :key="category.id" :to="category.path">
            <div class="h-full w-full flex justify-center items-center relative">
                <img class="bg-cover object-contain hover:scale-105 duration-300 opacity-50" src="https://th.bing.com/th/id/OIP.6j2eXBHMnAhDSRHB8wXCEQHaLH?rs=1&pid=ImgDetMain" alt="">
                <h1 class="small-title absolute ">
                    {{ category.name }}
                </h1>
            </div>
        </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { collection, getDocs } from "firebase/firestore";

const nuxtApp = useNuxtApp();

const db = nuxtApp.$firestore;
const categories = ref([]);
const isLoading = ref(true);

const fetchCategories = async () => {
    try {
        isLoading.value = true;
        const categoriesRef = await getDocs(collection(db,'categories'));
        categories.value = categoriesRef.docs.map( doc => ({
            id:doc.id,
            ...doc.data()
        }));
        isLoading.value = false;
    } catch (error) {
        isLoading.value = true;
        console.error('Error fetching categories: ',error);
    }
};

onMounted(()=>{
    fetchCategories();
});

</script>

<style scoped>


</style>
