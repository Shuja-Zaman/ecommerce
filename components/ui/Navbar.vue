<template>
  <nav class="p-5 flex justify-between items-center fixed w-full myborder backdrop-blur-md z-50">
    <div class="left">
        <h1 class="text-light">@ecommerce</h1>
    </div>

    <!-- display screen -->
    <div class="center space-x-8 hidden lg:block">
        <LinkButton v-for="item in navItems" :key="item.name" :name="item.name" :to="item.path"/>
    </div>
    <div class="right  hidden lg:block">
        <SolidButton name="Sign in" to="/signin"/>
    </div>

    <!-- slider -->
    <div class="lg:hidden block">
    <!-- <UButton label="Open" @click="isOpen = true" /> -->
    <UIcon @click="isOpen = true"  name="i-solar-hamburger-menu-outline" class="text-light h-7 w-7"/>

    <USlideover v-model="isOpen" class="lg:hidden block">
      <div class="p-4 flex-1 bg-dark">
        <UButton
          color="gray"
          variant="ghost"
          size="sm"
          icon="i-heroicons-x-mark-20-solid"
          class="flex sm:hidden absolute end-5 top-5 z-10"
          square
          padded
          @click="isOpen = false"
        />
        <Placeholder class="h-full" />

        <!-- items -->
        <div class="flex flex-col mt-10" @click="isOpen = false">
            <LinkButton v-for="item in navItems" :key="item.name" :name="item.name" :to="item.path"/>
            <SolidButton class="flex justify-center" to="/signin" name="Sign in"/>

        </div>

      </div>
    </USlideover>
  </div>
  </nav>
</template>

<script lang="ts" setup>

const navItems = ref([
    {name:'shop', path:'/shop'},
    {name:'categories', path:'/shop/category'},
    {name:'cart', path:'/cart'},
    {name:'contact', path:'/contact'},
    
]);

const isOpen = ref(false)

</script>

<style>

</style>