import { getAllCategories } from "@/services/adminCategories";
import ModalForm from "./ModalForm";

export default async function AddProductModal() {
    const {categories} = await getAllCategories(1);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden">
                <ModalForm categories={categories} />
            </div>
        </div>
    );
}