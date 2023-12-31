import { FaArrowRight } from "react-icons/fa";
import instructorImg from "../../../assets/Images/Instructor.png";
import CTAButton from "./Button";
import HighLightText from "./HighLightText";

const InstructorSection = () => {
    return (
        <div>
            <div className="mt-16 flex lg:flex-row flex-col gap-20 items-center">
                <div className="lg:w-[50%]">
                    <img src={instructorImg} alt="" />
                </div>
                <div className="lg:w-[50%] flex flex-col gap-10">
                    <div className="text-4xl font-semibold w-[50%]">
                        Become an <HighLightText text={"instructor"} />
                    </div>
                    <div className="font-medium text-[16px] text-richblack-300 w-[80%] ">
                        Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                    </div>
                    <div className="w-fit">
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className="flex items-center gap-2 ">
                                Start Teaching Today
                                <FaArrowRight />
                            </div>
                        </CTAButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InstructorSection