import { FormEvent } from "react";
import { useAppStore } from "../stores/useAppStore";

export default function GenerateAI() {
    const showNotification = useAppStore(state => state.showNotification);
    const generateRecipe = useAppStore(state => state.generateRecipe);
    const recipe = useAppStore(state => state.recipe);
    const isGenerating = useAppStore(state => state.isGenerating);

    const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const form = new FormData(e.currentTarget);
        const prompt = form.get('prompt') as string;

        if (prompt.trim() === '') {
            showNotification({
                error: true,
                text: 'La búsqueda no puede estar vacía',
            })
            return
        }
        await generateRecipe(prompt)
    }

    return (
        <>
            <h1 className="text-6xl font-extrabold">Generar receta con IA</h1>

            <div className="max-w-4xl mx-auto">
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col space-y-3 py-10'
                >
                    <div className="relative">
                        <input
                            name="prompt"
                            id="prompt"
                            className="border bg-white p-4 rounded-lg w-full border-slate-800"
                            placeholder="Genera una receta con ingredientes. Ej. Bebida con Tequila y Fresa"
                        />
                        <button
                            type="submit"
                            aria-label="Enviar"
                            className={`cursor-pointer absolute top-1/2 right-5 transform -translate-x-1/2 -translate-y-1/2 ${isGenerating ? 'cursor-not-allowed opacity-50' : ''}`}
                            disabled={isGenerating}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                stroke="currentColor" className="w-10 h-10">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </button>
                    </div>
                </form>
                {isGenerating && (
                    <div className="flex items-center justify-center">
                        <svg
                            className="animate-spin -ml-1 mr-3 h-10 w-10 text-gray-900"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v1m0 14v1m8.485-11.485l-.707.707M5.515 18.485l-.707-.707M20 12h1m-14 0H4m11.314-7.314l-.707.707M6.686 18.314l-.707-.707"
                            />
                        </svg>
                    </div>
                )}
                <div className="py-10 whitespace-pre-wrap">
                    {recipe}
                </div>
            </div>

        </>
    )
}