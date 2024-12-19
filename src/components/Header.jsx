import { Earth } from 'lucide-react';

export default function Header() {
  return (
    <header>
        <section className='flex items-center gap-2 p-6 fixed 
        right-0 top-0 bg-red-500 text-xl font-semibold justify-center text-gray-100 w-full'
        >
            <Earth size={32} />
            My travel journal
        </section>
    </header>
  )
}