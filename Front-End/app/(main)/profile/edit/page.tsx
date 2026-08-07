import { Suspense } from "react";
import EditProfileModal from "../_components/EditProfile"

function Edit() {
    return (
        <Suspense>
            <EditProfileModal />
        </Suspense>
    )
}

export default Edit;