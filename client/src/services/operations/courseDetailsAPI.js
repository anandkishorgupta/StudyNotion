import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { courseEndpoints } from "../apis";

const {
    COURSE_DETAILS_API,
    COURSE_CATEGORIES_API,
    GET_ALL_COURSE_API,
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    DELETE_COURSE_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    CREATE_RATING_API,
    LECTURE_COMPLETION_API,
} = courseEndpoints


// fetch the available course category
export const fetchCourseCategories = async () => {
    let result = []
    let toastId = toast.loading("loading categories list")
    try {
        const response = await apiConnector("GET", COURSE_CATEGORIES_API)
        console.log(response)
        if (!response?.data?.success) {
            throw new Error("Could not fetch course categories ")
        }
        result = response?.data?.allCategory
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}





//   GET ALL COURSES array
export const getAllCourses = async () => {
    const toastId = toast.loading("Loading.....")
    let result = []
    try {
        const response = await apiConnector("GET", GET_ALL_COURSE_API)
        if (!response?.data?.success) {
            throw new Error("Could not fetch courses ")
        }
    } catch (error) {
        console.log("get all course api error ,", error)
        toast.error(error.message)

    }
    toast.dismiss(toastId)
    return result
}

//   FETCH a COURSE DETAILS 
export const fetchCourseDetails = async (courseId) => {
    const toastId = toast.loading("Loading.....")
    let result = null
    try {
        const response = await apiConnector("POST", COURSE_DETAILS_API, {
            courseId
        })

        console.log("course detail api response ", response)
        if (!response.data.success) {
            throw new Error(response.data.message)

        }
        result = response.data
    } catch (error) {
        console.log("course detail api error", error)
        result = error.response.data

    }
    toast.dismiss(toastId)
    return result
}


// getFullCourseDetails authenticated 
export const getFullCourseDetails = async (courseId, token) => {
    let result;
    const toastId = toast.loading("loading....")
    try {
        const response = await apiConnector("POST", GET_FULL_COURSE_DETAILS_AUTHENTICATED, { courseId }, {
            Authorization: `Bearer ${token}`
        })
        if (!response) {
            throw new Error("unable to get full course details")
        }
        console.log("GET_FULL_COURSE_DETAILS_AUTHENTICATED.......", response)
        result = response?.data?.data
    } catch (error) {
        console.log(error)
        toast.error(error)
    }
    toast.dismiss(toastId)
    return result
}





// create course  
export const addCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading.......")
    try {
        const response = await apiConnector("POST", CREATE_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        })
        console.log(response)
        if (!response?.data?.success) {
            throw new Error("Could Not add course details")
        }
        toast.success("Course details added successfully")
        console.log(result)
        result = response?.data?.data
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

// edit/update course detail
export const editCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading.....")
    try {
        console.log(...data)
        const response = await apiConnector("PATCH", EDIT_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        })
        toast.success("course details edited successfully")
        result = response?.data?.data
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result

}

// GET COURSES OF AN INSTRUCTOR 
export const fetchInstructorCourse = async (token) => {
    let result
    const toastId = toast.loading("Loading.....")
    try {
        const response = await apiConnector("POST", GET_ALL_INSTRUCTOR_COURSES_API, null, {
            Authorization: `Bearer ${token}`
        })
        console.log("GET_ALL_INSTRUCTOR_COURSES_API....", response)
        result = response?.data?.data
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result

}




// delete course
export const deleteCourse = async (data, token) => {
    let result;
    const toastId = toast.loading("loading...")
    try {
        const response = await apiConnector("POST", DELETE_COURSE_API, data, {
            Authorization: `Bearer ${token}`
        })
        result = response.data.message
        console.log(response)
        toast.success(result)
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}









// SECTION****************************

// create  section 
export const createSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", CREATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("CREATE SECTION API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Create Section")
        }
        toast.success("Course Section Created")
        result = response?.data?.updateCourseDetails
    } catch (error) {
        console.log("CREATE SECTION API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

// update a section
export const updateSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        //data contain sectionId,sectionName,courseId
        console.log("UPDATE SECTION API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Update Section")
        }

        toast.success("Course Section Updated")
        result = response?.data?.data
    } catch (error) {
        console.log("UPDATE SECTION API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

// delete a section 
export const deleteSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading......")
    try {
        const response = await apiConnector("POST", DELETE_SECTION_API, data, {
            Authorization: `Bearer ${token}`
        })
        if (!response.data.message) {
            throw new Error("unable to delete a section")
        }
        console.log(response)
        toast.success("section deleted successfully")
        result = response?.data?.data
    } catch (error) {
        console.log("delete SECTION API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}




// SUBSECTION****************
// create subSection
export const createSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("loading...")
    try {
        const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`
        })
        console.log("create subsection api response", response)
        if (!response?.data?.success) {
            throw new Error("unable to create subSection")
        }
        toast.success("subSection Created Successfully")
        result = response?.data?.updatedSection
    } catch (error) {
        console.log(error)
        toast.error(error)
    }
    toast.dismiss(toastId)
    return result
}

// update sub section
export const updateSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`
        })
        if (!response?.data?.success) {
            throw new Error("Unable to update sub section")
        }
        console.log(response)
        toast.success("subSection updated successfully")
        result = response?.data?.updatedSection

    } catch (error) {
        console.log(error)
        toast.error(error)
    }
    toast.dismiss(toastId)
    return result
}

// delete subSection
export const deleteSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("loading....")
    try {
        const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`
        })

        if (!response?.data?.success) {
            throw new Error("Unable to update sub section")
        }
        console.log(response)
        result = response?.data?.data
    } catch (error) {
        console.log(error)
        toast.error(error)
    }
    toast.dismiss(toastId)
    return result
}



// create rating
export const createRating = async (data, token) => {
    let toastId = toast.loading("loading....")
    try {
        console.log("from create rating api.........", data)
        const response = await apiConnector("POST", CREATE_RATING_API, data, {
            Authorization: `Bearer ${token}`
        })

        toast.success("rating created successfully")
        console.log(response)
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)

    }
    toast.dismiss(toastId)
}


// LECTURE COMPLETION
export const markLectureAsComplete = async (data, token) => {
    let result = null
    const toastId = toast.loading("loading...")
    try {
        const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
            Authorization: `Bearer ${token}`
        })
        console.log("LECTURE_COMPLETION_API response......", response)
        if (!response.data.success) {
            throw new Error("error occurrerd while updating completed video")
        }
        toast.success("lecture completed ")
        result = true
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.error)
        result = null
    }
    toast.dismiss(toastId)
    return result
}