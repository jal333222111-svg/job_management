import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ClipboardList, Pencil, Plus, Trash2 } from "lucide-react";
import TaskFormModal from "@/components/TaskFormModal";
import { toast } from "sonner";

type Task = {
  id: number;
  title: string;
  description?: string;
  status: "baru" | "proses" | "selesai";
  tingkatan: "rendah" | "sedang" | "tinggi";
  deadline?: string | null;
  user?: { id: number; name: string } | null;
  project?: { id: number; title: string } | null;
};

export default function TaskIndex() {
  const { tasks, users, projects } = usePage().props as {
    tasks: { data: Task[] };
    users: { id: number; name: string }[];
    projects: { id: number; title: string }[];
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Manajemen Pekerjaan", href: "/tasks" },
  ];

  const handleDelete = (id: number) => {
    if (confirm("Yakin ingin menghapus pekerjaan ini?")) {
      router.delete(`/tasks/${id}`, {
        onSuccess: () => toast.success("Pekerjaan berhasil dihapus"),
        onError: () => toast.error("Gagal menghapus pekerjaan"),
      });
    }
  };

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      baru: "bg-gray-300 text-gray-800",
      proses: "bg-yellow-300 text-yellow-900",
      selesai: "bg-green-400 text-green-900",
    };
    return (
      <span
        className={`px-2 py-1 text-xs font-semibold rounded ${colors[status]}`}
      >
        {status}
      </span>
    );
  };

  const tingkatanBadge = (level: string) => {
    const colors: Record<string, string> = {
      rendah: "bg-green-200 text-green-800",
      sedang: "bg-blue-200 text-blue-800",
      tinggi: "bg-red-200 text-red-800",
    };
    return (
      <span
        className={`px-2 py-1 text-xs font-semibold rounded ${colors[level]}`}
      >
        {level}
      </span>
    );
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="px-8 py-4">
        {/* Header Section */}
        <div
          className="flex flex-col md:flex-row justify-between md:items-center gap-3 mb-6 
                     bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                     p-4 rounded-xl shadow-md"
        >
          <h1 className="text-xl font-bold flex items-center gap-2 text-white">
            <ClipboardList className="w-6 h-6" />
            Manajemen Pekerjaan
          </h1>

          <Button
            onClick={() => {
              setSelectedTask(null);
              setIsModalOpen(true);
            }}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            <Plus className="w-4 h-4 mr-1" /> Tambah Pekerjaan
          </Button>
        </div>

        {/* Table Section */}
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-xl">
            <CardTitle className="font-semibold flex items-center gap-2 text-white">
              <ClipboardList className="w-5 h-5" /> Daftar Pekerjaan
            </CardTitle>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead>Judul</TableHead>
                  <TableHead>Deskripsi</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Tingkatan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Penanggung Jawab</TableHead>
                  <TableHead className="text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {tasks.data.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center text-gray-500 py-6"
                    >
                      Belum ada pekerjaan
                    </TableCell>
                  </TableRow>
                ) : (
                  tasks.data.map((t) => (
                    <TableRow
                      key={t.id}
                      className="hover:bg-gray-50 transition"
                    >
                      <TableCell>{t.title}</TableCell>
                      <TableCell>{t.description || "-"}</TableCell>
                      <TableCell>{t.project?.title || "-"}</TableCell>
                      <TableCell>{tingkatanBadge(t.tingkatan)}</TableCell>
                      <TableCell>{statusBadge(t.status)}</TableCell>
                      <TableCell>{t.deadline || "-"}</TableCell>
                      <TableCell>{t.user?.name || "-"}</TableCell>

                      <TableCell className="flex gap-2 justify-center">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-indigo-500 text-indigo-600 hover:bg-indigo-100"
                          onClick={() => {
                            setSelectedTask(t);
                            setIsModalOpen(true);
                          }}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          className="bg-red-500 hover:bg-red-600 text-white"
                          onClick={() => handleDelete(t.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Modal Form */}
        <TaskFormModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          task={selectedTask}
          users={users}
          projects={projects}
        />
      </div>
    </AppLayout>
  );
}
