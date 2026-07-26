import { getOneProduct } from "@/services/adminProducts";
import FormAddImage from "./_components/FormAddImage";
import DeleteImage from "./_components/DeleteImage";

export default async function ProductImages({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const { productId } = await searchParams;
  const product = await getOneProduct(productId);

  return (
    <>
      <h2 className="text-2xl font-extrabold text-slate-800 mb-4">افزودن تصویر</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {product.images.map((img: string, index: number) => (
          <div
            key={index}
            className="group relative aspect-square overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300"
          >
            <img
              src={`http://localhost:4000/${img}`}
              alt={`Product Image ${index + 1}`}
              className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300" />

            {/* Delete Button */}
            <DeleteImage image={img} productId={productId}/>
          </div>
        ))}

        <FormAddImage />
      </div>
    </>
  );
}