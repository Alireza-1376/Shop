import Link from "next/link";
import { RiAddLine } from "react-icons/ri";
import { IoImageOutline } from "react-icons/io5";
import { getAllProducts } from "@/services/adminProducts";
import ActivityBtns from "./_components/ActivityBtns";
import PaginationBtns from "@/app/_components/pagination";
import { IoIosGitBranch } from "react-icons/io";

async function ProductsPage({ searchParams }: { searchParams: Promise<{ [key: string]: number }> }) {
  const { page } = await searchParams;
  const { products, currentPage, lastPage } = await getAllProducts(page, 4);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800">
            مدیریت محصولات
          </h1>
        </div>

        <Link href="/admin/products/addProduct" className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-orange-500 text-orange-500 font-medium hover:bg-orange-500 hover:text-white transition-all duration-300 cursor-pointer">
          <RiAddLine size={20} />
          <span>افزودن محصول</span>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-hidden bg-white border border-slate-200 rounded-3xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-212.5">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-center text-sm font-bold text-slate-700">
                  #
                </th>

                <th className="px-6 py-4 text-center text-sm font-bold text-slate-700">
                  تصویر
                </th>

                <th className="px-6 py-4 text-center text-sm font-bold text-slate-700">
                  عنوان محصول
                </th>

                <th className="px-6 py-4 text-center text-sm font-bold text-slate-700">
                  دسته‌بندی
                </th>

                <th className="px-6 py-4 text-center text-sm font-bold text-slate-700">
                  قیمت
                </th>

                <th className="px-6 py-4 text-center text-sm font-bold text-slate-700">
                  عملیات
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((product, index) => (
                <tr
                  key={product._id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-all"
                >
                  <td className="px-6 py-4 text-center font-semibold text-slate-800">
                    {index + 1}
                  </td>

                  <td className="px-6 py-2">
                    <div className="flex justify-center">
                      {product.images.length > 0 ?
                        <img
                          src={`http://localhost:4000/${product.images[0]}`}
                          alt=""
                          className="w-20 h-16 rounded-2xl object-cover border border-slate-200"
                        />
                        :
                        <div className="w-20 h-16 rounded-2xl object-cover border bg-slate-50 border-slate-200"></div>
                      }
                    </div>
                  </td>

                  <td className="px-6 py-2 text-center font-semibold text-slate-800">
                    {product.title}
                  </td>

                  <td className="px-6 py-2 text-center">
                    <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-700">
                      {product.category?.title}
                    </span>
                  </td>

                  <td className="px-6 py-2 text-center text-slate-500">
                    {Number(product.price).toLocaleString("en-US")}
                  </td>

                  <td className="px-6 py-2 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <Link href={{ pathname: "/admin/products/images", query: { productId: product._id } }} className="flex items-center cursor-pointer justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all">
                        <IoImageOutline size={18} />
                      </Link>
                      <Link href={{ pathname: "/admin/products/subbranch", query: { productId: product._id } }} className="flex items-center cursor-pointer justify-center w-10 h-10 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition-all">
                        <IoIosGitBranch />
                      </Link>
                      <ActivityBtns product={product} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-slate-500">
              هیچ محصولی ثبت نشده است.
            </p>
          </div>
        )}
      </div>

      {products.length > 0 &&
        <PaginationBtns currentPage={currentPage} lastPage={lastPage} />
      }

    </div>
  );
}

export default ProductsPage;