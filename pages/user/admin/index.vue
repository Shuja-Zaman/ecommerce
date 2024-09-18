<template>
  <div class="min-h-screen pt-24 px-5 flex lg:flex-row flex-col gap-5 mb-10">
    <!-- menu -->
    <div class="flex lg:flex-col flex-row justify-around border-[1px] h-max rounded shadow-lg">
        <UTooltip text="Home">
            <UButton icon="i-heroicons-home-solid" variant="soft" color="sky" size="xl" @click="showName = 'home'"/>
        </UTooltip>
        <UTooltip text="Categories">
            <UButton icon="i-heroicons-rectangle-group-solid" variant="soft" color="sky" size="xl" @click="showName = 'category'"/>
        </UTooltip>
        <UTooltip text="Products">
            <UButton icon="i-heroicons-shopping-bag" variant="soft" color="sky" size="xl" @click="showName = 'product' "/>
        </UTooltip>
        <UTooltip text="Bundles">
            <UButton icon="i-heroicons-archive-box" variant="soft" color="sky" size="xl" @click="showName = 'bundle' "/>
        </UTooltip>
        <UTooltip text="messages">
            <UButton icon="i-heroicons-chat-bubble-left-ellipsis" variant="soft" color="sky" size="xl" @click="showName = 'message' "/>
        </UTooltip>
        <UTooltip text="orders">
            <UButton icon="i-heroicons-currency-dollar" variant="soft" color="sky" size="xl" @click="showName = 'order' "/>
        </UTooltip>
    </div>
    <!-- render component -->
     <div class="border-[1px] rounded shadow-lg w-full h-max pb-4">
        <Home v-if="showName == 'home'"/>
        <Category v-if="showName == 'category' "/>
        <Product v-if="showName == 'product' "/>
        <Bundle v-if="showName == 'bundle' "/>
        <Message v-if="showName == 'message' "/>
        <Order v-if="showName == 'order' "/>
     </div>

  </div>
</template>

<script setup>
const showName = ref('home');

</script>

<style>

</style>