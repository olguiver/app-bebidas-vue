import { ref, reactive, onMounted, computed } from 'vue'
import { defineStore } from 'pinia'
import APIService from '@/services/APIService'
import { useModalStore } from './modal'

export const useBebidasStore = defineStore('bebidas', () => {

    const modal = useModalStore()
    const categorias = ref([])
    const busqueda = reactive({
        nombre: '',
        categoria: ''
    }) 
    const recetas = ref([])
    const receta = ref({})

    onMounted(async function() {
        const {data: {drinks}} = await APIService.obtenerCategorias()
        categorias.value = drinks
    })
 
    //Si vas a escribir una funcion que modifica el state tienes que hacerlo mediante de function
    async function obtenerRecetas() {
        const {data: {drinks}} = await APIService.buscarRecetas(busqueda)
        //console.log(drinks)
        recetas.value = drinks
        //console.log(data)
    }

    async function seleccionarBebida(id) {
        const { data: { drinks }} = await APIService.buscarReceta(id)
        receta.value = drinks[0]
        modal.handleClickModal()
    }

    const noRecetas = computed(() => recetas.value.length === 0)

    return {
        categorias,
        busqueda,
        recetas,
        obtenerRecetas,
        seleccionarBebida,
        receta,
        noRecetas
    }

})