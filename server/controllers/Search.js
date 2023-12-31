import Course from "../models/Course.js";

export const SearchCourse = async (req, res) => {
    try {
        const { query } = req.body;

        const courses = await Course.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "instructor",
                    foreignField: "_id",
                    as: "instructorData",
                },
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "categoryData",
                },
            },
            {
                $match: {
                    $or: [
                        { courseName: { $regex: query, $options: "i" } },
                        { courseDescription: { $regex: query, $options: 'i' } },
                        { "instructorData.firstName": { $regex: query, $options: 'i' } },
                        { "instructorData.lastName": { $regex: query, $options: 'i' } },
                        { "categoryData.name": { $regex: query, $options: 'i' } },
                        { tag: { $regex: query, $options: 'i' } },

                    ]  
                }
            }
        ]);

        res.json({
            success: true,
            data: courses
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}
