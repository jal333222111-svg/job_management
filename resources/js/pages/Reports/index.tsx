import { Head, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, ClipboardCheck, Clock, FolderOpen } from "lucide-react";
import AppLayout from "@/layouts/app-layout";

export default function Reports() {

    const {
        totalProjects,
        totalTasks,
        completedTasks,
        pendingTasks,
        latestProjects,
        latestTasks,
    } = usePage().props;

    const [selectedProject, setSelectedProject] = useState(null);
    const [projectTasks, setProjectTasks] = useState([]);

    // Load tasks by project
    const loadTasks = async (project) => {
        setSelectedProject(project);

        const res = await fetch(`/reports/project/${project.id}/tasks`);
        const data = await res.json();

        setProjectTasks(data);
    };

    const summary = [
        { title: "Total Projects", value: totalProjects, icon: <FolderOpen className="w-8 h-8" /> },
        { title: "Total Tasks", value: totalTasks, icon: <BarChart3 className="w-8 h-8" /> },
        { title: "Completed Tasks", value: completedTasks, icon: <ClipboardCheck className="w-8 h-8" /> },
        { title: "Pending Tasks", value: pendingTasks, icon: <Clock className="w-8 h-8" /> },
    ];

    return (
        <AppLayout title="Laporan">
            <Head title="Reports" />

            <div className="p-6 space-y-6">
                <h1 className="text-3xl font-bold mb-4">Reports</h1>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {summary.map((item, i) => (
                        <Card key={i} className="shadow-sm border bg-white rounded-xl p-3">
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
                                    <th>Title</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {latestProjects.length > 0 ? (
                                    latestProjects.map((p) => (
                                        <tr
                                            key={p.id}
                                            className="border-b hover:bg-gray-100 cursor-pointer"
                                            onClick={() => loadTasks(p)}
                                        >
                                            <td className="py-2">{p.id}</td>
                                            <td>{p.title}</td>
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

                {/* Tasks of the Selected Project */}
                {selectedProject && (
                    <div>
                        <h2 className="text-xl font-semibold mt-4 mb-2">
                            Tasks for: {selectedProject.title}
                        </h2>

                        <Card className="p-4 border shadow-sm rounded-xl">
                            <table className="w-full text-left">
                                <thead className="border-b">
                                    <tr>
                                        <th className="py-2">ID</th>
                                        <th>Title</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projectTasks.length > 0 ? (
                                        projectTasks.map((t) => (
                                            <tr key={t.id} className="border-b">
                                                <td className="py-2">{t.id}</td>
                                                <td>{t.title}</td>
                                                <td>
                                                    <span className="px-2 py-1 rounded bg-gray-200 text-sm">
                                                        {t.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center py-3 text-gray-500">
                                                No tasks found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </Card>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
