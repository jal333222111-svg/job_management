import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import ProjectFormModal from "@/components/ProjectFormModal";

type Project = {
  id: number;
  title: string;
  description: string | null;
  deadline: string | null;
  tingkatan: "mudah" | "sedang" | "susah";
  status: "belum di kerjakan" | "proses" | "selesai";
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

  return (
    <AppLayout breadcrumbs={[{ title: "Projects", href: "/projects" }]}>
      <div className="p-6">
        {/* Header + Tambah */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Daftar Project</h1>
          <Button
            onClick={() => {
              setSelectedProject(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" /> Tambah data
          </Button>
        </div>

        {/* List Project */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Data Project</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Judul</TableHead>
                  <TableHead>Deskripsi</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tingkatan</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead className="text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-gray-500">
                      Belum ada project
                    </TableCell>
                  </TableRow>
                ) : (
                  projects.data.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>{p.title}</TableCell>
                      <TableCell>{p.description || "-"}</TableCell>
                      <TableCell>{p.status}</TableCell>
                      <TableCell>{p.tingkatan}</TableCell>
                      <TableCell>{p.deadline || "-"}</TableCell>
                      <TableCell className="flex gap-2 justify-center">
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
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

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
