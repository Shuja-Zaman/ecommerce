<template>
  <div class="min-h-screen flex flex-col justify-center items-center">
    <Loader v-if="isLoading"/>
    <h1 class="text-4xl font-extrabold mt-10">Contact us</h1>
    <UForm v-bind:class="isLoading ? 'dimmed pointer-events-none' : '' " validate-on="submit" :schema="schema" :state="state" class="lg:w-1/2 px-10 space-y-5 mt-5" @submit="onSubmit">

      <div class="name email flex justify-between gap-5">
        <UFormGroup required class="w-full" label="Name" name="name">
          <UInput v-model="state.name" type="text"  size="xl" color="dark"/>
        </UFormGroup>
        <UFormGroup required label="Email" class="w-full" name="email">
          <UInput v-model="state.email" size="xl" color="dark"/>
        </UFormGroup>
      </div>
      
      <UFormGroup required label="Phone number" name="mobile">
          <UInput v-model="state.mobile" size="xl" color="dark"/>
      </UFormGroup>

      <UFormGroup name="message" label="Message">
        <UTextarea v-model="state.message" color="dark"/>
      </UFormGroup>
      
      <!-- <SolidButton type="submit" name="Send" class="w-full text-center block py-3"/> -->
      <UButton label="Send" class="rounded-none w-full block text-center" size="xl" color="sky" type="submit" />
    </UForm>
  </div>
</template>

<script setup>


const nuxtApp = useNuxtApp();
import { collection, addDoc } from 'firebase/firestore';
import { object, string } from 'yup';

const db = nuxtApp.$firestore;
const isLoading = ref(false);
const toast = useToast();

const schema = object({
  email: string().email('Invalid email').required('Required'),
  name: string().required('Required'),
  mobile: string().required('Required'),
  message: string().required('Required'),
});

const state = reactive({
  email: undefined,
  name: undefined,
  mobile: undefined,
  message: undefined,
});

async function onSubmit (event) {
  submitMessage();
}

const submitMessage = async () => {
    try {
        isLoading.value = true;

        const docRef = await addDoc(collection(db, 'messages'),{
          email: state.email,
          name : state.name,
          message: state.message,
          mobile: state.mobile,
        });

        isLoading.value = false;

        toast.add({title:'Confirmation', description:'Message successfully sent.'})

        state.name = '';
        state.email = '';
        state.message = '';
        state.mobile = '';


    } catch (error) {
        console.error('Error sending message: ', error);
    }
};


</script>

<style>

</style>