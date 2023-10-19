import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal"
import VideoDetailSidebar from "../components/core/ViewCourse/VideoDetailSidebar"
import { getFullCourseDetails } from "../services/operations/courseDetailsAPI"
import {
    setCompletedLectures,
    setCourseSectionData, setEntireCourseData,
    setTotalNoOfLectures
} from "../slices/viewCourseSlice"

const ViewCourse = () => {
    const [reviewModal, setReviewModal] = useState(false)
    const { courseId } = useParams()
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const setCourseSpecificDetails = async () => {

        const courseData = await getFullCourseDetails(courseId, token)
        console.log("courseData.........", courseData)

        dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
        dispatch(setEntireCourseData(courseData.courseDetails))
        dispatch(setCompletedLectures(courseData.completedVideos))
        let lectures = 0
        courseData?.courseDetails?.courseContent?.forEach((sec) => {
            lectures += sec.subSection.length
        })
        dispatch(setTotalNoOfLectures(lectures))

    }
    useEffect(() => {
        setCourseSpecificDetails()
    }, [])
    return (
        <>
            <div className="flex">
                <VideoDetailSidebar
                    setReviewModal={setReviewModal}

                />
                <div className="w-7/12">
                    <Outlet />
                </div>
                {
                    reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />
                }
            </div>
        </>

    )
}

export default ViewCourse