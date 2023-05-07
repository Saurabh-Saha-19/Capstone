import Header from "@/components/Header";
import Modal from "@/components/Modal";
import UserProfileInfo from "@/components/UserProfileInfo";



function UserProfile() {
    return (
        <div className="">
            {/* Header */}
            <Header />

            {/* UserProfileInfo */}
            <UserProfileInfo />

            {/* Modal */}
            <Modal />
        </div>

    )
}

export default UserProfile