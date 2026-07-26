import ActivityBtns from "./_components/ActivityBtns";
import AddVariantsForm from "./_components/AddVariantsForm";
import { getOneProduct } from "@/services/adminProducts";

export default async function ProductVariantsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string }>; }) {
    const { productId } = await searchParams;
    const product = await getOneProduct(productId)
    return (
        <div className="space-y-8">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-extrabold text-slate-800">
                    مدیریت مدل‌های محصول
                </h1>
                <p className="text-slate-500 mt-1">
                    مدل‌های مختلف این محصول را ثبت کنید.
                </p>
            </div>

            {/* Form */}
            <AddVariantsForm productId={productId} />

            {/* List */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b">
                    <h2 className="font-bold text-slate-800">
                        مدل‌های ثبت شده
                    </h2>
                </div>
                <div className="divide-y">

                    {product.variants.map((variant, index) => (
                        <div
                            key={index + 1}
                            className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 p-5 hover:bg-slate-50 transition"
                        >
                            <div>
                                <h3 className="font-bold text-slate-800">
                                    {variant.title}
                                </h3>
                                <p className="text-slate-500 mt-1">
                                    {Number(variant.price).toLocaleString("en-US")}
                                    {" "}
                                    تومان
                                </p>
                            </div>
                            <ActivityBtns variantId={variant._id} productId={productId} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}