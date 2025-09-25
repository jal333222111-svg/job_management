import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Trash2 } from "lucide-react";

type Project = {
  id: number;
  title: string;
  description: string | null;
  deadline: string | null;
  status: string;
};

export default function index() {
  const { projects } = usePage().props as { projects: { data: Project[] } };
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.post("/projects", { title, status: "pending" });
    setTitle("");
  };

  const handleDelete = (id: number) => {
    if (confirm("Hapus project ini?")) {
      router.delete(`/projects/${id}`);
    }
  };

  return (
    <AppLayout breadcrumbs={[{ title: "Projects", href: "/projects" }]}>
      <div className="p-6">
        {/* Tambah Project */}
        <Card className="mb-6 border-0 shadow-md">
          <CardHeader>
            <CardTitle>Tambah Project</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="text"
                placeholder="Judul project"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <Button type="submit" className="flex items-center gap-2">
                <PlusCircle className="w-4 h-4" /> Tambah
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* List Project */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Daftar Project</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Judul</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead className="text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-gray-500">
                      Belum ada project
                    </TableCell>
                  </TableRow>
                ) : (
                  projects.data.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>{p.title}</TableCell>
                      <TableCell>{p.status}</TableCell>
                      <TableCell>{p.deadline || "-"}</TableCell>
                      <TableCell className="text-center">
                        <Button
                          size="sm"
                          variant="destructive"
                          className="bg-red-500 hover:bg-red-600"
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
      </div>
    </AppLayout>
  );
}
