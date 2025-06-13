import Link from 'next/link'

export default async function NotFound() {

  return (
    <div className="text-center h-screen flex flex-col justify-center">
      <h2 className='text-5xl m-5'>Error 404</h2>
      <p className='text-2xl mb-2'>La pagina que estas buscando no existe</p>
      <div className='flex justify-center'>
        <Link href="/" className='w-fit rounded-lg px-5 py-2'>Volver a la tienda</Link>
      </div>
    </div>
  )
}