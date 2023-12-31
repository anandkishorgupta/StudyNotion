import { useState } from "react"
import { FcMenu } from "react-icons/fc"
import { RxCross1 } from "react-icons/rx"
import { VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { sidebarLinks } from "../../../data/dashboard-links"
import { logout } from "../../../services/operations/authAPI"
import ConfirmationModal from "../../common/ConfirmationModal"
import SidebarLink from "./SidebarLink"
const Sidebar = () => {
    const { user, loading: profileLoading } = useSelector((state) => state.profile)
    const { loading: authLoading } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [isopen, setIsopen] = useState(false)
    const navigate = useNavigate()
    const [confirmationModal, setConfirmationModal] = useState(null)
    if (authLoading || profileLoading) {
        return (
            <div className="mt-10">
                loading....
            </div>
        )
    }
    return (

        <div className="relative">
            <div className={`${isopen ? "block fixed" : "hidden"}  lg:block flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10`}
            >
                <div className="flex flex-col">
                    {
                        sidebarLinks.map((link) => {
                            if (link.type && user?.accountType !== link.type)
                                return null
                            return (
                                // runs if !link.type or, user?.accountType==link.type
                                <SidebarLink key={link.id} link={link} iconName={link.icon} />
                            )
                        }

                        )

                    }

                </div>
                <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
                {/* setting and logout  */}
                <div className="flex flex-col ">
                    {/* settings  */}
                    <SidebarLink link={{ name: "Settings", path: "dashboard/settings" }}
                        iconName={"VscSettingsGear"}
                    />
                    {/* logout */}
                    <button onClick={() => setConfirmationModal({
                        text1: "Are You Sure?",
                        text2: "You will be logged out of your Account",
                        btn1Text: "Logout",
                        btn2Text: "Cancel",
                        btn1Handler: () => dispatch(logout(navigate)),
                        btn2Handler: () => setConfirmationModal(null)
                    })}
                        className="text-sm font-medium text-richblack-300 px-8 py-2 "
                    >
                        <div className="flex items-center gap-x-2 text-richblack-5">
                            <VscSignOut className="text-lg " />
                            <span>Logout</span>
                        </div>
                    </button>

                </div>
            </div>
       
            {
                !isopen &&
                <FcMenu className="absolute text-4xl text-richblack-5 cursor-pointer " style={{ color: 'white' }} 
                onClick={()=>setIsopen(true)}
                />

            }
            {
                isopen &&
                <RxCross1 className="absolute left-28 translate-y-[90%] top-0 translate-x-[500%] text-3xl cursor-pointer"
                    onClick={() => setIsopen(false)}
                />
            }
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    )
}

export default Sidebar