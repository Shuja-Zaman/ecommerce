<template>
    <UButton :label="name" variant="outline"  color="sky" class="hover:bg-sky-100 rounded-none" size="xl"/>
</template>

<script setup>

const props = defineProps({
    name:String
});

</script>

<style>

</style>