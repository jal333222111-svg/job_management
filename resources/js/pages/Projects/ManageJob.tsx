import { Head, Link, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import AppLayout from "@/layouts/app-layout";

export default function ManageJob() {
  const { project, progress } = usePage().props as any;

  return (
    <AppLayout>
      <Head title={`Manage - ${project.title}`} />

      <div className="p-6 space-y-6">
        {/* === Informasi Project === */}
        <motion.div
          className="bg-white shadow rounded-2xl p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold mb-2">{project.title}</h1>
          <p className="text-gray-600 mb-2">{project.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <p>
              <strong>Deadline:</strong> {project.deadline || "-"}
            </p>
            <p>
              <strong>Tingkatan:</strong> {project.tingkatan}
            </p>
            <p>
              <strong>Status:</strong> {project.status}
            </p>
            <p>
              <strong>Owner:</strong> {project.user?.name || "-"}
            </p>
          </div>
        </motion.div>

        {/* === Progress === */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Progress</h2>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div
              className="bg-green-500 h-3 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p>{progress}% selesai</p>
        </div>

        {/* === Pengguna yang Terlibat === */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-3">Pengguna yang Terlibat</h2>
          {project.users && project.users.length > 0 ? (
            <ul className="list-disc ml-5 text-gray-700 space-y-1">
              {project.users.map((user: any) => (
                <li key={user.id}>
                  {user.name}
                  {user.position && (
                    <>
                      {" "}
                      — <span className="text-gray-500">{user.position}</span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Belum ada pengguna terlibat</p>
          )}
        </div>

        {/* === Daftar Tugas === */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-3">Daftar Tugas</h2>
          <div className="space-y-3">
            {project.tasks && project.tasks.length > 0 ? (
              project.tasks.map((task: any) => (
                <div key={task.id} className="p-3 border rounded-lg">
                  <p className="font-semibold">{task.title}</p>
                  <p className="text-gray-500">{task.description}</p>
                  <p className="text-sm mt-1">
                    Status:{" "}
                    <span className="font-medium capitalize">
                      {task.status}
                    </span>
                  </p>
                  <p className="text-sm">
                    Dikerjakan oleh:{" "}
                    <span className="font-medium">
                      {task.user?.name || "Belum ditugaskan"}
                    </span>
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Belum ada tugas</p>
            )}
          </div>
        </div>

        {/* === Tombol Kembali === */}
        <div className="flex justify-end">
          <Link
            href={route("projects.index")}
            className="text-blue-600 hover:underline"
          >
            ← Kembali ke daftar project
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
