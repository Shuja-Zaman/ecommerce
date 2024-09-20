export default defineNuxtRouteMiddleware((to, from) => {
    const user = useCookie('user');
    if(user.value == 'shujapersonal125@gmail.com'){
        return ;
    }else{
        return navigateTo('/')
    }
})
