<template>
  <div v-bind:class="isLoading ? 'opacity-40 pointer-events-none': ''" class="p-2">
    <!-- categories -->
    <div class="flex lg:flex-row flex-col gap-2 justify-around">
        <UBadge v-for="category in categories" icon="" :key="category.id" :label="category.name" size="xl" class="p-2" color="white"/>
    </div>

    <hr class="my-5">

    <!-- form -->
    <UForm validate-on="submit" :schema="schema" :state="state" class="space-y-5 mt-5" @submit="onSubmit">
        <UFormGroup required label="Category name" name="category">
            <UInput v-model="state.name" size="xl" color="dark"/>
        </UFormGroup>

        <SolidButton type="submit" name="Add Category" class="rounded w-1/2 text-center block mx-auto py-3"/>
    </UForm>

  </div>
</template>

<script setup>
import { collection, addDoc } from 'firebase/firestore';
const { categories, isLoading } = useFetchCategories();
import { object, string } from 'yup';
const nuxtApp = useNuxtApp();
const db = nuxtApp.$firestore;

const schema = object({
  name: string().required('Required'),
});

const state = reactive({
  name: undefined,
});

async function onSubmit () {
  await addCategory();
}

const addCategory = async () => {
    try {
        console.log(state.name)
        isLoading.value = true;
        const docRef = await addDoc(collection(db, 'categories'),{
            name:state.name,
            path:`/shop/${state.name}`
        });
        console.log(docRef);
        state.name = '';
    } catch (error) {
        console.error("Error adding Category :", error);
    }finally{
        isLoading.value = false;
    }
}

</script>

<style>

</style>