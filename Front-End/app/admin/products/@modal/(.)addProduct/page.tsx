import { Suspense } from "react";
import AddProductModal from "../../_components/AddProductModal";

function Modal() {
  return (
    <Suspense>
      <AddProductModal />
    </Suspense>
  )
}

export default Modal;