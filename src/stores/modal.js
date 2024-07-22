import { ref,computed } from 'vue'
import { defineStore } from 'pinia'
import { useFavoritosStore } from './favoritos'
import { useBebidasStore } from './bebidas'

export const useModalStore = defineStore('modal', () => {

    const favoritos = useFavoritosStore()
    const bebidas = useBebidasStore()
    const modal = ref(false)

    //es una funcion porque modifica el valor
    function handleClickModal() {
        modal.value = !modal.value
    }

    //Getter
    const textoBoton = computed(() => {
        return favoritos.existeFavorito(bebidas.receta.idDrink) ? 'Eliminar de favoritos' : 'Agregar a Favoritos'
    })

    return {
        modal,
        handleClickModal,
        textoBoton
    }
})