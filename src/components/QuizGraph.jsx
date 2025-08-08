const QuizGraph = ({ courses, quizes }) => {

    // 1. Filter courses with quiz attempts (i.e., score exists)
    const attemptedCourses = courses.filter(course => course.score !== undefined);

    // 2. Count attempts by course title
    const topicCounts = attemptedCourses.reduce((acc, course) => {
        const topic = course.title || "Other"; // fallback if title missing
        acc[topic] = (acc[topic] || 0) + 1;
        return acc;
    }, {});

    // 3. Assign colors
    const colors = [
        "#FAD7A0",
        "#F4A261",
        "#F6BE7A",
        "#D2691E",
        "#FF9F1C",
        "#2EC4B6",
        "#E71D36",
    ];

    // 4. Convert to array and assign even percentage
    const total = Object.keys(topicCounts).length;

    const percentages = Object.entries(topicCounts).map(([name, value], idx) => ({
        name,
        value,
        color: colors[idx % colors.length],
        percentage: Math.round(100 / total),
    }));

    const getGradient = () => {
        let currentDeg = 0;
        return percentages
            .map((item) => {
                const start = currentDeg;
                const end = currentDeg + item.percentage * 3.6;
                currentDeg = end;
                return `${item.color} ${start}deg ${end}deg`;
            })
            .join(", ");
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm">
            <h2 className="text-base font-semibold mb-4">Attempted Quizes</h2>

            <div className="relative w-40 h-40 mx-auto">
                <div
                    className="w-full h-full rounded-full"
                    style={{
                        background: `conic-gradient(${getGradient()})`,
                    }}
                ></div>
                <div className="absolute top-1/2 left-1/2 w-28 h-28 bg-white rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
                    <div className="text-center">
                        <p className="text-2xl font-bold">{quizes}</p>
                        <p className="text-xs text-gray-500">Quiz Attempted</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6 text-xs font-medium text-gray-700">
                {percentages.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <div
                            className="w-3 h-3 rounded-sm"
                            style={{ backgroundColor: item.color }}
                        ></div>
                        <span>
                            {item.name} ({item.percentage}%)
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuizGraph;
