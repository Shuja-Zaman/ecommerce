<template>
    <UButton :label="name" variant="outline"  color="sky" class="hover:bg-sky-950" size="xl"/>
</template>

<script setup>

const props = defineProps({
    name:String
});

</script>

<style>

</style>