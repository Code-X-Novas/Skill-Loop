import { useNavigate } from "react-router-dom";

function CourseCard({ title, description, image, isActive, id, slug }) {
    const navigate = useNavigate();
    return (
        <article
            className="relative w-[280px] h-full rounded-2xl overflow-hidden text-white shadow-xl"
            style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            role="article"
            aria-label={`Course: ${title}`}
        >
            <div className="absolute inset-0 bg-black/60 md:p-6 p-4 flex flex-col justify-between">
                {/* header */}
                <div>
                    <h2
                        className="text-xl  font-bold leading-tight mb-2"
                        itemProp="name"
                    >
                        {title}
                    </h2>
                    {/* <p className="font-semibold text-sm mb-2">{students} Students</p> */}
                    {isActive && (
                        <p
                            className="text-sm leading-snug"
                            itemProp="description"
                        >
                            {description}
                        </p>
                    )}
                </div>

                {/* join now */}
                <button
                    className="mt-6 w-fit lg:px-4 px-1.5 lg:py-2 py-1 lg:text-sm text-xs bg-transparent text-white 
                    font-semibold rounded-md border-2 border-white hover:bg-white hover:text-black transition"
                    aria-label={`Join ${title} course now`}
                    type="button"
                    onClick={() => navigate(`/courses/${slug}/${id}/enroll`)}
                >
                    Join Now
                </button>
            </div>
        </article>
    );
}

export default CourseCard;
