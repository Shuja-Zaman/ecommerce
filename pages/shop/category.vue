<template>
  <div class="pt-32">

    <Loader v-if="isLoading"/>

    <h1 v-bind:class="isLoading ? 'dimmed' : '' " class="text-center title">Categories</h1>

    <div v-if="!isLoading" class="categories grid lg:grid-cols-4 sm:grid-cols-1 p-4 gap-5 mt-5 ">
        <NuxtLink class="text-center h-[20rem] w-3/4 overflow-hidden m-auto rounded-lg myshadow" v-for="category in categories" :key="category.id" :to="category.path">
            <div class="h-full w-full flex justify-center items-center relative">
                <img class="h-full w-full bg-cover object-cover hover:scale-105 duration-300 opacity-50" src="https://th.bing.com/th/id/OIP.6j2eXBHMnAhDSRHB8wXCEQHaLH?rs=1&pid=ImgDetMain" alt="">
                <h1 class="small-title absolute ">
                    {{ category.name }}
                </h1>
            </div>
        </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { categories, isLoading } = useFetchCategories();

console.log(categories);

</script>

<style scoped>


</style>
