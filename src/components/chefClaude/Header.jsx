import { ChefHat } from 'lucide-react';

export default function Header() {
  return (
    <header>
        <section className='chef-header flex items-center gap-2 p-6 fixed 
        right-0 top-0 bg-white text-xl font-semibold justify-center
         text-gray-700 w-full'
        >
            <ChefHat size={32} />
            Chef Claude
        </section>
    </header>
  )
}