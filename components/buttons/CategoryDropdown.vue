<script setup>

const {categories} = useFetchCategories();

const isHovered = ref(false);

</script>

<template>
<div class="inline relative">
    <GhostButton @mouseover="isHovered = true" name="categories" trailing-icon="i-heroicons-chevron-down-20-solid"/>
    <div @mouseleave="isHovered = false" @mouseover="isHovered" v-if="isHovered" class="shadow-xl absolute bg-neutral-100 border rounded w-full right-0 flex flex-col gap-2 p-2">
        <NuxtLink class="hover:bg-neutral-200 rounded hover:pl-1 duration-200" :to="`${item.path}-${item.id}`" v-for="item in categories" :key="item.id">
            {{ item.name }}
        </NuxtLink>
    </div>
</div>
</template>

