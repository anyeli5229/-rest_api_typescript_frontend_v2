import { ActionFunctionArgs, Form, redirect, useFetcher, useNavigate } from "react-router-dom"
import { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductService"

type ProductDetailProps = {
    product: Product
}

export async function action({params}: ActionFunctionArgs) {
    if(params.id !== undefined) {
        await deleteProduct(+params.id)
        return redirect('/')
    }
    
}

export default function ProductDetails({product} : ProductDetailProps ) {
  
  const isAvailable = product.availability
  const navigate = useNavigate()
  const fetcher = useFetcher() //Fetccher funciona para poder hacer interacciones pero mantenerte en la misma página

return (
    <tr className="border-b ">
    <td className="p-3 text-lg text-gray-800">
        {product.name}
    </td>
    <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
    </td>
    <td className="p-3 text-lg text-gray-800">
        <fetcher.Form method='POST'>
            <button
                type='submit'
                name='id'
                value={product.id}
                className={`${isAvailable ? 'text-black' : 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}>
                {isAvailable ? 'Disponible' : 'No Disponible'}
            </button>
        </fetcher.Form>
    </td>
    <td className="p-3 text-lg text-gray-800 ">
       <div className="flex gap-2 items-center">
        <button 
        onClick={() => navigate(`/productos/${product.id}/editar`)}
        className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center">
            Editar</button>
        <Form className="w-full" method="POST" action={`productos/${product.id}/eliminar`} onSubmit={(event) => {
            if(!confirm('¿Desea eliminar el producto')) {
                event.preventDefault()
            }
        }}>
            {/* Se utiliza el action en el form para poder usar la funciones creadas de action (deleteProductAction) en el router cuando es un elemento y no es un vista y así utlizar correctamente la url */}
            <input type="submit" className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center" value='Eliminar'/>
        </Form>
       </div>
    </td>
</tr> 
  )
}
