<template>
    <UButton :label="name" variant="ghost" color="dark" class="rounded-none" size="xl"/>
</template>

<script setup>

const props = defineProps({
    name:String
});

</script>

<style>

</style>