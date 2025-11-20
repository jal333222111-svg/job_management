import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

export default function DashboardIndex({ stats, nearestDeadline }: any) {
    return (
        <AppLayout title="Dashboard">
            <Head title="Dashboard" />

            <div className="p-6 space-y-6">
                {/* Title */}
                <h1 className="text-2xl font-bold">Dashboard</h1>

                {/* Cards Container */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Total Project */}
                    <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-5">
                        <h2 className="text-gray-500 dark:text-gray-300 text-sm">Total Projects</h2>
                        <p className="text-3xl font-bold mt-2">{stats.totalProjects}</p>
                    </div>

                    {/* Total Tasks */}
                    <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-5">
                        <h2 className="text-gray-500 dark:text-gray-300 text-sm">Total Tasks</h2>
                        <p className="text-3xl font-bold mt-2">{stats.totalTasks}</p>
                    </div>

                    {/* Deadline terdekat */}
                    <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-5">
                        <h2 className="text-gray-500 dark:text-gray-300 text-sm">Nearest Deadline</h2>
                        {nearestDeadline ? (
                            <>
                                <p className="text-lg font-semibold mt-2">{nearestDeadline.title}</p>
                                <p className="text-sm text-gray-400">
                                    {nearestDeadline.deadline}
                                </p>
                            </>
                        ) : (
                            <p className="text-gray-400 mt-2">No deadline available</p>
                        )}
                    </div>
                </div>

                {/* Sub Stats */}
                <h2 className="text-xl font-bold mt-6">Project Summary</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card label="Belum Dikerjakan" value={stats.belumProjects} />
                    <Card label="Proses" value={stats.prosesProjects} />
                    <Card label="Selesai" value={stats.selesaiProjects} />
                </div>

                <h2 className="text-xl font-bold mt-6">Task Summary</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card label="Baru" value={stats.baruTasks} />
                    <Card label="Proses" value={stats.prosesTasks} />
                    <Card label="Selesai" value={stats.selesaiTasks} />
                </div>
            </div>
        </AppLayout>
    );
}

function Card({ label, value }) {
    return (
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-5">
            <h2 className="text-gray-500 dark:text-gray-300 text-sm">{label}</h2>
            <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
    );
}
