import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";

export default function Footer() {
    return (
        <footer className="bg-slate-800">
            <div className="mx-auto container px-5 py-5">
                <div className="flex justify-between items-center">
                    <img src="/logo.svg" className="w-32 " alt="Logo" />
                    <nav className="flex gap-4">
                        <ChatBubbleBottomCenterTextIcon className="h-5 w-5 text-white items-center" /> <a href="https://www.instagram.com/angel.lphernandez/" target="_blank" className="text-white">angel.lphernandez@gmail.com</a>
                    </nav>
                </div>
            </div>
        </footer>
    )
}
