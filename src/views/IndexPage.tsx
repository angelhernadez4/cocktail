import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import DrinkCard from "../components/DrinkCard"
import Spinner from "../components/Spinner"

function IndexPage() {
    const drinks = useAppStore((state) => state.drinks)
    const hasDrinks = useMemo(() => drinks.drinks.length, [drinks])
    const loadingDrinks = useAppStore((state) => state.loadingDrinks)
    return (
        <>
            <h1 className="text-6xl font-extrabold">Recetas</h1>
            {hasDrinks ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
                    {loadingDrinks ? (
                        <div className="flex justify-center items-center col-span-full h-40">
                            <Spinner />
                        </div>
                    ) : (
                        drinks.drinks.map((drink) => (
                            <DrinkCard key={drink.idDrink} drink={drink} />
                        ))
                    )}
                </div>
            ) : (
                <p className="my-10 text-center text-2xl">No hay resultados aún, utiliza el formulario para buscar recetas</p>
            )}
        </>
    )
}

export default IndexPage