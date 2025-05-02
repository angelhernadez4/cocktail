import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import Select from 'react-select'
import { useAppStore } from "../stores/useAppStore"

// Función para transformar los datos
const transformCategories = (data : any) => {
    return data.drinks.map((category : any) => ({
      value: category.strCategory,
      label: category.strCategory
    }));
};

function Header() {
    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    })

    const { pathname } = useLocation()
    const isHome = useMemo(() => pathname === '/', [pathname])
    const fecthCategories = useAppStore((state) => state.fecthCategories)
    const categories = useAppStore((state) => state.categories)
    const loadingCategories = useAppStore((state) => state.loadingCategories)
    const loadingDrinks = useAppStore((state) => state.loadingDrinks)
    const showNotification = useAppStore((state) => state.showNotification)    
    const searchRecipes = useAppStore((state => state.searchRecipes))
    const categoriesOptions = transformCategories(categories)
    
    useEffect(() => {
        fecthCategories()
    }, [])

    const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name] : e.target.value
        })
    }

    const handleChange = (e: any, actionMeta: any) => {
        setSearchFilters({
            ...searchFilters,
            [actionMeta.name] : e.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Validar
        if (Object.values(searchFilters).includes('')) {
            showNotification({text: 'Todos los campos son obligatorios', error: true})
            return
        }

        // Consultar la receta
        searchRecipes(searchFilters)
    }

    return (
        <header className={isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800'}>
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div className="">
                        <img src="/logo.svg" className="w-32 " alt="Logo" />
                    </div>
                    <nav className="flex gap-4">
                        <NavLink to="/" className={({isActive}) => isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'}>Inicio</NavLink>
                        <NavLink to="/favorites" className={({isActive}) => isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'}>Favoritos</NavLink>
                        <NavLink to="/generate" className={({isActive}) => isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'}>Generar con IA</NavLink>
                    </nav>
                </div>
                {isHome && (
                    <form onSubmit={handleSubmit} className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 rounded-lg p-10 shadow space-y-6">
                        <div className="space-y-4">
                            <label htmlFor="ingredient" className="block text-white uppercase font-extrabold text-lg">Nombre o ingredientes</label>
                            <input type="text" name="ingredient" id="ingredient" onChange={handleChangeText} value={searchFilters.ingredient} className="p-3 w-full rounded-lg focus:outline-none" placeholder="Nombre o ingrediente, Ej. Vodka Tequila, café" />
                        </div>
                        <div className="space-y-4">
                            <label htmlFor="category" className="block text-white uppercase font-extrabold text-lg">Categoría</label>
                            <Select options={categoriesOptions} isLoading={loadingCategories} onChange={handleChange} value={categoriesOptions.find((option: any) => option.value === searchFilters.category)} name="category" id="category" placeholder='Selecciona una categoría' />
                        </div>
                        <input
                            type="submit" 
                            value={`${loadingDrinks ? 'Buscando...' : 'Buscar recetas'}`}
                            className={`${loadingDrinks ? 'cursor-not-allowed opacity-50 hover:bg-orange-900' : 'cursor-pointer'} bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase`}
                            disabled={loadingDrinks}
                        />
                    </form>
                )}
            </div>
        </header>
    )
}

export default Header