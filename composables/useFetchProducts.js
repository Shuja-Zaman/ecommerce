import { collection, getDocs } from "firebase/firestore";

export const useFetchProducts = () => {
    const products = ref([]);
    const isLoading = ref(true);

    const fetchProducts = async () => {
        try {
            const nuxtApp = useNuxtApp();
            const db = nuxtApp.$firestore;
            const productsRef = await getDocs(collection(db,'products'));
            products.value = productsRef.docs.map( doc => ({
                id:doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error fetching Products: ',error);
        }finally{
            isLoading.value = false;
        }
    }

    fetchProducts();

    return {
        products, isLoading
    };
};


