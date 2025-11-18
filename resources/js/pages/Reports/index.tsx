import { Head } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, ClipboardCheck, Clock, FolderOpen } from "lucide-react";

export default function Reports({ 
    totalProjects, 
    totalTasks, 
    completedTasks, 
    pendingTasks,
    latestProjects,
    latestTasks
}) {

    const summary = [
        {
            title: "Total Projects",
            value: totalProjects,
            icon: <FolderOpen className="w-8 h-8" />,
        },
        {
            title: "Total Tasks",
            value: totalTasks,
            icon: <BarChart3 className="w-8 h-8" />,
        },
        {
            title: "Completed Tasks",
            value: completedTasks,
            icon: <ClipboardCheck className="w-8 h-8" />,
        },
        {
            title: "Pending Tasks",
            value: pendingTasks,
            icon: <Clock className="w-8 h-8" />,
        },
    ];

    return (
        <>
            <Head title="Reports" />

            <div className="p-6 space-y-6">
                <h1 className="text-3xl font-bold mb-4">Reports</h1>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {summary.map((item, index) => (
                        <Card key={index} className="shadow-sm border bg-white rounded-xl p-3">
                            <CardContent className="flex items-center gap-4">
                                <div className="p-3 bg-gray-100 rounded-xl">
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm">{item.title}</p>
                                    <p className="text-2xl font-bold">{item.value}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Latest Projects */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">Latest Projects</h2>
                    <Card className="p-4 border shadow-sm rounded-xl">
                        <table className="w-full text-left">
                            <thead className="border-b">
                                <tr>
                                    <th className="py-2">ID</th>
                                    <th>Name</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {latestProjects.length > 0 ? (
                                    latestProjects.map((p) => (
                                        <tr key={p.id} className="border-b">
                                            <td className="py-2">{p.id}</td>
                                            <td>{p.name}</td>
                                            <td>
                                                <span className="px-2 py-1 rounded bg-gray-200 text-sm">
                                                    {p.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center py-3 text-gray-500">
                                            No projects available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </Card>
                </div>

                {/* Latest Tasks */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">Latest Tasks</h2>
                    <Card className="p-4 border shadow-sm rounded-xl">
                        <table className="w-full text-left">
                            <thead className="border-b">
                                <tr>
                                    <th className="py-2">ID</th>
                                    <th>Task</th>
                                    <th>Project</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {latestTasks.length > 0 ? (
                                    latestTasks.map((t) => (
                                        <tr key={t.id} className="border-b">
                                            <td className="py-2">{t.id}</td>
                                            <td>{t.name}</td>
                                            <td>{t.project_id}</td>
                                            <td>
                                                <span className="px-2 py-1 rounded bg-gray-200 text-sm">
                                                    {t.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-3 text-gray-500">
                                            No tasks available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </Card>
                </div>
            </div>
        </>
    );
}
