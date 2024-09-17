<template>
  <div class="min-h-screen overflow-hidden text-dark bg-light josefin-sans-font">
    <UAlert title="Website still in dvelopment. Not accepting orders" class="" color="red" variant="solid"/>
    <Navbar />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Footer/>
    
    <UNotifications />
  </div>
</template>
