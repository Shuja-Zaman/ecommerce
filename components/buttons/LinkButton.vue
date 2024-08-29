<template>
    <UButton :label="name" variant="link" color="sky" size="xl"/>
</template>

<script setup>

const props = defineProps({
    name:String
});

</script>

<style>

</style>