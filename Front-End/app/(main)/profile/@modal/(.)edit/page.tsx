import { Suspense } from "react"
import EditProfileModal from "../../_components/EditProfile"

function Edit() {
    return (
        <div>
            <Suspense>
                <EditProfileModal />
            </Suspense>
        </div>
    )
}

export default Edit