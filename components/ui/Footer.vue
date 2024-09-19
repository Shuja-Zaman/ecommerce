<template>
  <div class="flex lg:flex-row flex-col justify-between gap-10 bg-sky-100 hover:bg-sky-200 duration-200 footer p-5 py-10">
    <!-- title -->
    <div class="space-y-8">
        <h1>
            <NuxtLink to="/">
                <img src="/assets/logos/logo_1.png" alt="aktivfits" class="h-8">
          </NuxtLink>
        </h1>
        <p class="text-sm text-dull">Pakistan's best marketplace to buy premium clothing.</p>
    </div>
    <!-- links -->
    <div class="flex flex-col">
        <NuxtLink v-for="link in links" class="hover:text-neutral-600" :key="link.id" :to="`${link.path}`">
            {{ link.name }}
        </NuxtLink>
    </div>
    <!-- extra -->
    <div>
        <h1 class="font-bold uppercase">Need help?</h1>
        <p class="font-bold text-sm">Reach us at</p>
        <h1>Email: <span class="text-dull underline">aktiv.store.fits@gmail.com</span> </h1>
        <h1>Call/Whatsapp: <span class="text-dull underline">03390252521</span> </h1>
        <div class="flex items-center gap-3">
            <h1>Follow us on : </h1>
            <a href="https://instagram.com" class="flex gap-2">
                <img class="h-6 w-6 lg:grayscale hover:grayscale-0 duration-200"  src="/assets/logos/instagram.svg" alt="instagram">
            </a>
            <a href="https://facebook.com" class="flex gap-2">
                <img class="h-6 w-6 lg:grayscale hover:grayscale-0 duration-200"  src="/assets/logos/facebook.svg" alt="instagram">
            </a>
        </div>

    </div>
  </div>
</template>

<script setup>
const links = ref([
    {name:'Shop', path:'/shop'},
    {name:'About us', path:'/about'},
    {name:'Contact', path:'/contact'},
    {name:'Privacy policy', path:'/privacy-policy'}
]);

</script>

<style>

</style>