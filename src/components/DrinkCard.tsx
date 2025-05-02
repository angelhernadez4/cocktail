import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid"
import { useAppStore } from "../stores/useAppStore"
import type { Drink } from "../types"


type DrinkCardProps = {
    drink: Drink
}

function DrinkCard({ drink } : DrinkCardProps) {
    const selectRecipe = useAppStore((state) => state.selectRecipe)
    const loadingDrink = useAppStore((state) => state.loadingDrink)
    const modal = useAppStore((state) => state.modal)
    return (
        <div className="border shadow-lg rounded-md">
            <div className="overflow-hidden">
                <img src={drink.strDrinkThumb} className="hover:scale-125 transition-transform hover:rotate-2" alt={`Imagen de ${drink.strDrink}`} />
            </div>
            <div className="p-5">
                <h2 className="text-2xl truncate font-black">{drink.strDrink}</h2>
                <button type="button" onClick={() => selectRecipe(drink.idDrink)} className={`${loadingDrink ? 'cursor-wait hover:bg-orange-500 opacity-50' : 'cursor-pointer'} bg-orange-400 hover:bg-orange-500 mt-5 w-full p-3 font-bold text-white text-lg rounded-lg`}>
                    <div className="flex items-center justify-center gap-2">
                        {modal ? (
                            <EyeSlashIcon className="text-white w-6" />
                        ) : (
                            <EyeIcon className="text-white w-6" />
                        )}
                        
                        Ver receta
                    </div>
                </button>
            </div>
        </div>
    )
}

export default DrinkCard