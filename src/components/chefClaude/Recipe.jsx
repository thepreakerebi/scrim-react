import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'


export default function Recipe( { recipe } ) {


  return (
    <section className="mt-8 flex flex-col gap-4 w-full text-gray-800 leading-8 text-lg font-medium">
      <h2 className="text-2xl font-semibold">Chef Claude Recommends:</h2>
      <ReactMarkdown children={recipe} aria-live="polite" remarkPlugins={[remarkGfm]} />
    </section>
  )
}