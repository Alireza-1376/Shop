import { getAllCategories } from "@/services/adminCategories";
import { getAllProducts } from "@/services/adminProducts";
import Product from "./Product";
import Cart from "./Cart";

async function Menu() {

    const [{ categories }, { products }] = await Promise.all([
        getAllCategories(1),
        getAllProducts(1)
    ])


    return (
        <div className="mt-10 grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-9">
                {categories.map((category) => {
                    const filterProduct = products.filter((product) => {
                        return product.category._id == category._id;
                    })
                    return (
                        <div key={category._id} className="mb-12 ">
                            <div>
                                <h3 className="font-bold text-2xl mb-4">{category.title}</h3>
                            </div>
                            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                {filterProduct.map((product) => {
                                    return (
                                        <Product product={product} key={product._id}/>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
            <Cart/>
        </div>
    )
}

export default Menu;