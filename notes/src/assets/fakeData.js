// Updated data structure with groups
export const fakeData = {
    groups: [
        {
            id: 1,
            name: "Personal",
            color: "#4fe2ff",
            createdAt: new Date().toISOString(),
        },
        {
            id: 2,
            name: "Work",
            color: "#ff2727",
            createdAt: new Date().toISOString(),
        },
        {
            id: 3,
            name: "Studies",
            color: "#27ff27",
            createdAt: new Date().toISOString(),
        }
    ],
    notes: [
        {
            $id: 1,
            groupId: 1, // Belongs to "Personal" group
            body: JSON.stringify(
                'Personal Resources:\n- Book: "You Don\'t Know JS: Scope & Closures" by Kyle Simpson.\n\n- Online Course: "JavaScript Patterns" on Udemy.\n\n- Articles:\n"Understanding JavaScript Closures" on Medium.\n\n"Mastering JavaScript Modules" on Dev.to.'
            ),
            colors: JSON.stringify({
                id: "color-purple",
                colorHeader: "#FED0FD",
                colorBody: "#FEE5FD",
                colorText: "#AAAAAA",
            }),
            position: JSON.stringify({ x: 505, y: 10 }),
            createdAt: new Date().toISOString(),
        },
        {
            $id: 2,
            groupId: 2, // Belongs to "Work" group
            body: JSON.stringify(
                'Work Resources:\n- Meeting notes for project Alpha\n\n- Task: Complete API documentation\n\n- Deadline: End of week'
            ),
            colors: JSON.stringify({
                id: "color-blue",
                colorHeader: "#9BD1DE",
                colorBody: "#A6DCE9",
                colorText: "#AAAAAA",
            }),
            position: JSON.stringify({ x: 305, y: 110 }),
            createdAt: new Date().toISOString(),
        },
        {
            $id: 3,
            groupId: 1, // Also belongs to "Personal" group
            body: JSON.stringify(
                'Shopping List:\n- Groceries\n- Books\n- Electronics'
            ),
            colors: JSON.stringify({
                id: "color-yellow",
                colorHeader: "#FFEFBE",
                colorBody: "#FFF5DF",
                colorText: "#AAAAAA",
            }),
            position: JSON.stringify({ x: 605, y: 500 }),
            createdAt: new Date().toISOString(),
        },
        {
            $id: 4,
            groupId: 3, // Belongs to "Studies" group
            body: JSON.stringify(
                'Study Notes:\n- Chapter 5: Advanced JavaScript Concepts\n\n- Practice: Build a React app\n\n- Review: CSS Grid and Flexbox'
            ),
            colors: JSON.stringify({
                id: "color-green",
                colorHeader: "#B8E6B8",
                colorBody: "#D4F1D4",
                colorText: "#AAAAAA",
            }),
            position: JSON.stringify({ x: 105, y: 300 }),
            createdAt: new Date().toISOString(),
        },
    ]
};