<template>
    <UButton :label="name" variant="solid" color="black" class="rounded-none" size="xl"/>
</template>

<script setup>

const props = defineProps({
    name:String
});

</script>

<style>

</style>