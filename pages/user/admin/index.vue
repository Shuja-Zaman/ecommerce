<template>
  <div class="min-h-screen pt-24 px-5 flex lg:flex-row flex-col gap-5 mb-10">
    <!-- menu -->
    <div class="flex lg:flex-col flex-row justify-around border-[1px] h-max rounded shadow-lg">
        <UTooltip text="Home">
            <UButton icon="i-heroicons-home-solid" variant="soft" color="sky" size="xl"/>
        </UTooltip>
        <UTooltip text="Categories">
            <UButton icon="i-heroicons-rectangle-group-solid" variant="soft" color="sky" size="xl"/>
        </UTooltip>
        <UTooltip text="Products">
            <UButton icon="i-heroicons-shopping-bag" variant="soft" color="sky" size="xl"/>
        </UTooltip>
        <UTooltip text="Bundles">
            <UButton icon="i-heroicons-archive-box" variant="soft" color="sky" size="xl"/>
        </UTooltip>
        <UTooltip text="messages">
            <UButton icon="i-heroicons-chat-bubble-left-ellipsis" variant="soft" color="sky" size="xl"/>
        </UTooltip>
    </div>
    <!-- render component -->
     <div class="border-[1px] rounded shadow-lg w-full h-max pb-4">
        <!-- <Category/> -->
        <!-- <Product/> -->
        <!-- <Bundle/> -->
        <!-- <Message/> -->
        <Home/>
     </div>

  </div>
</template>

<script setup>

</script>

<style>

</style>