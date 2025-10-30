import { useState } from "react";
import { router, usePage, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Pencil, Trash2, Users } from "lucide-react";
import ProjectFormModal from "@/components/ProjectFormModal";

// =====================
// Tipe Data
// =====================
type Job = {
  id: number;
  title: string;
  priority: string;
  due_date: string;
  officer?: string; // jika masih ingin menampilkan user yang mengerjakan task
  status: string;
};

type Project = {
  id: number;
  title: string;
  description: string | null;
  deadline: string | null;
  tingkatan: "mudah" | "sedang" | "susah";
  status: "belum di kerjakan" | "proses" | "selesai";
  user?: { name: string }; // Ganti owner -> user relasi dari tabel users
  file_path?: string | null;
  jobs?: Job[];
  collaborators_count?: number;
};

export default function Index() {
  const { projects } = usePage().props as { projects: { data: Project[] } };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // =====================
  // Hapus Project
  // =====================
  const handleDelete = (id: number) => {
    if (confirm("Yakin ingin menghapus project ini?")) {
      router.delete(`/projects/${id}`);
    }
  };

  // =====================
  // Warna Berdasarkan Tingkatan
  // =====================
  const getPriorityColor = (tingkatan: string) => {
    switch (tingkatan) {
      case "susah":
        return "bg-red-100 text-red-600 border-red-300";
      case "sedang":
        return "bg-yellow-100 text-yellow-600 border-yellow-300";
      default:
        return "bg-green-100 text-green-600 border-green-300";
    }
  };

  // =====================
  // Warna Berdasarkan Status
  // =====================
  const getStatusColor = (status: string) => {
    switch (status) {
      case "selesai":
        return "text-green-600";
      case "proses":
        return "text-blue-600";
      default:
        return "text-gray-500";
    }
  };

  // =====================
  // Render
  // =====================
  return (
    <AppLayout breadcrumbs={[{ title: "Projects", href: "/projects" }]}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">My Projects</h1>
        </div>

        {/* Grid Project */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card Tambah Project */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="border-2 border-dashed border-gray-300 flex items-center justify-center rounded-xl h-48 cursor-pointer hover:bg-gray-50"
            onClick={() => {
              setSelectedProject(null);
              setIsModalOpen(true);
            }}
          >
            <span className="text-gray-500 font-medium">+ New Project</span>
          </motion.div>

          {/* List Project */}
          {projects.data.map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-md border p-4 flex flex-col justify-between overflow-hidden"
            >
              {/* Bagian Atas */}
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h2 className="font-semibold text-lg break-words line-clamp-1 max-w-[80%]">
                    {p.title}
                  </h2>
                  <span
                    className={`text-xs px-2 py-1 rounded-md border font-medium ${getPriorityColor(
                      p.tingkatan
                    )}`}
                  >
                    {p.tingkatan}
                  </span>
                </div>

                {/* Deskripsi */}
                <p className="text-sm text-gray-600 mb-3 break-words line-clamp-2">
                  {p.description || "Tidak ada deskripsi"}
                </p>

                {/* Info Tambahan */}
                <div className="text-sm space-y-1">
                  <p>
                    <strong>Owner:</strong>{" "}
                    <span className="text-gray-700">
                      {p.user?.name || "-"}
                    </span>
                  </p>
                  <p>
                    <strong>Deadline:</strong>{" "}
                    {p.deadline ? (
                      <span className="text-gray-700">{p.deadline}</span>
                    ) : (
                      "-"
                    )}
                  </p>
                  <p className={`${getStatusColor(p.status)}`}>
                    <strong>Status:</strong> {p.status}
                  </p>

                  {/* File */}
                  {p.file_path && (
                    <p>
                      <strong>File:</strong>{" "}
                      <a
                        href={`/storage/${p.file_path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Lihat File
                      </a>
                    </p>
                  )}
                </div>
              </div>

              {/* Tombol Aksi */}
              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedProject(p);
                      setIsModalOpen(true);
                    }}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(p.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={route("projects.manage", p.id)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
                  >
                    Manage Job →
                  </Link>

                  {p.collaborators_count !== undefined && (
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                      <Users className="w-4 h-4" />
                      {p.collaborators_count}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Form */}
        <ProjectFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          project={selectedProject}
        />
      </div>
    </AppLayout>
  );
}
