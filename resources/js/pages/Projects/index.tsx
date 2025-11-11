import { useState } from "react";
import { router, usePage, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import ProjectFormModal from "@/components/ProjectFormModal";

type Project = {
  id: number;
  title: string;
  description: string | null;
  deadline: string | null;
  status: "belum dikerjakan" | "proses" | "selesai";
  file_path?: string | null;
  tanggal_mulai?: string | null;
  tanggal_selesai?: string | null;
};

export default function Index() {
  const { projects } = usePage().props as { projects: { data: Project[] } };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleDelete = (id: number) => {
    if (confirm("Yakin ingin menghapus project ini?")) {
      router.delete(`/projects/${id}`);
    }
  };

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

  return (
    <AppLayout breadcrumbs={[{ title: "Projects", href: "/projects" }]}>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Daftar Project</h1>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="border-2 border-dashed border-gray-300 flex items-center justify-center rounded-xl h-48 cursor-pointer hover:bg-gray-50"
            onClick={() => {
              setSelectedProject(null);
              setIsModalOpen(true);
            }}
          >
            <span className="text-gray-500 font-medium">+ Tambah Project</span>
          </motion.div>

          {projects.data.map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-md border p-4 flex flex-col justify-between"
            >
              <div>
                <h2 className="font-semibold text-lg break-words mb-2">
                  {p.title}
                </h2>

                <p className="text-sm text-gray-600 mb-3 break-words line-clamp-2">
                  {p.description || "Tidak ada deskripsi"}
                </p>

                <div className="text-sm space-y-1">
                  <p>
                    <strong>Deadline:</strong>{" "}
                    {p.deadline || "-"}
                  </p>
                  <p>
                    <strong>Tanggal Mulai:</strong>{" "}
                    {p.tanggal_mulai || "-"}
                  </p>
                  <p>
                    <strong>Tanggal Selesai:</strong>{" "}
                    {p.tanggal_selesai || "-"}
                  </p>
                  <p className={`${getStatusColor(p.status)}`}>
                    <strong>Status:</strong> {p.status}
                  </p>

                  {p.file_path && (
                    <p>
                      <strong>File:</strong>{" "}
                      <a
                        href={`/storage/${p.file_path}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Lihat File
                      </a>
                    </p>
                  )}
                </div>
              </div>

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

                <Link
                  href={route("projects.manage", p.id)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
                >
                  Manage Job →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <ProjectFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          project={selectedProject}
        />
      </div>
    </AppLayout>
  );
}
