import React from "react";

function UserDashboard() {
    // Example user data and events (replace with real data/fetching as needed)
    const user = {
        name: "John Doe",
        role: "Club Member",
        performance: {
            eventsAttended: 12,
            points: 85,
        },
    };

    const upcomingEvents = [
        { id: 1, name: "Annual Meetup", date: "2024-07-15" },
        { id: 2, name: "Workshop: Leadership Skills", date: "2024-08-02" },
    ];

    return (
        <div className="p-6 bg-white rounded shadow-md max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-2">User Dashboard</h1>
            <div className="mb-4">
                <p className="text-gray-700">
                    Welcome, <span className="font-semibold">{user.name}</span>!
                </p>
                <p className="text-sm text-gray-500">Role: {user.role}</p>
            </div>
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-1">Performance</h2>
                <ul className="list-disc ml-6 text-gray-700">
                    <li>Events Attended: {user.performance.eventsAttended}</li>
                    <li>Points: {user.performance.points}</li>
                </ul>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-1">Upcoming Events</h2>
                {upcomingEvents.length > 0 ? (
                    <ul className="list-disc ml-6 text-gray-700">
                        {upcomingEvents.map(event => (
                            <li key={event.id}>
                                <span className="font-medium">{event.name}</span> -{" "}
                                <span className="text-gray-500">{event.date}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No upcoming events.</p>
                )}
            </div>
        </div>
    );
}

export default UserDashboard;
