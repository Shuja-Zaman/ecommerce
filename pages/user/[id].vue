<template>
  <div class="min-h-screen flex flex-col items-center justify-center w-full px-4 md:px-0">
    <h1 class="title font-semibold my-5">Account</h1>

    <!-- details -->
    <div class="w-full max-w-md p-6">
      <div class="flex flex-col items-center mb-5">
        <UAvatar chip-color="sky" alt="Avatar" :src="userCred.imgUrl" size="3xl" />
      </div>

      <UForm class="space-y-5">
        <!-- Name Input -->
        <UFormGroup label="Name" name="name">
          <UInput :value="userCred.name" type="text" size="xl" color="dark" readonly class="w-full"/>
        </UFormGroup> 

        <!-- Email Input -->
        <UFormGroup label="Email" name="email">
          <UInput :value="userCred.email" size="xl" color="dark" readonly class="w-full"/>
        </UFormGroup>

        <UButton @click="logout" size="xl" label="Log out" class="rounded-none w-full block text-center" color="red"/>
      </UForm>
    </div>
  </div>
</template>

<script setup>
const userCred = useState('userCred');

import { getAuth, signOut } from 'firebase/auth';
const auth = getAuth();
const router = useRouter();

const logout = () => {
    signOut(auth)
    .then(() => {
      userCred.value = {};
      router.push('/');
    })
    .catch((error) => {
      console.error('Error signing out: ' ,error);
    })
}

</script>

<style scoped>
/* Add styles if needed */
</style>
