import { collection, getDocs } from "firebase/firestore";

export const useFetchCategories = () => {
    const categories = ref([]);
    const isLoading = ref(true);

    const fetchCategories = async () => {
        try {
            const nuxtApp = useNuxtApp();
            const db = nuxtApp.$firestore;
            const categoriesRef = await getDocs(collection(db,'categories'));
            categories.value = categoriesRef.docs.map( doc => ({
                id:doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error fetching categories: ',error);
        }finally{
            isLoading.value = false;
        }
    }

    fetchCategories();

    return {
        categories, isLoading
    };
};


