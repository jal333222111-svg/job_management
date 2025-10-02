import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Plus, Trash2, Pencil } from "lucide-react";

type Assignment = {
  id: number;
  role?: string;
  task: { id: number; title: string };
  user: { id: number; name: string };
};

export default function Index() {
  const { assignments, tasks, users } = usePage().props as {
    assignments: { data: Assignment[] };
    tasks: { id: number; title: string }[];
    users: { id: number; name: string }[];
  };

  const [formData, setFormData] = useState({
    task_id: "",
    user_id: "",
    role: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.post("/assignments", formData);
  };

  const handleDelete = (id: number) => {
    if (confirm("Yakin ingin menghapus penugasan ini?")) {
      router.delete(`/assignments/${id}`);
    }
  };

  return (
    <AppLayout breadcrumbs={[{ title: "Penugasan", href: "/assignments" }]}>
      <div className="p-6">
        {/* Form tambah */}
        <Card className="mb-6 shadow-md border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" /> Tambah Penugasan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
              <Select
                value={formData.task_id}
                onValueChange={(val) => setFormData((p) => ({ ...p, task_id: val }))}
              >
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Pilih Tugas" />
                </SelectTrigger>
                <SelectContent>
                  {tasks.map((t) => (
                    <SelectItem key={t.id} value={String(t.id)}>
                      {t.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={formData.user_id}
                onValueChange={(val) => setFormData((p) => ({ ...p, user_id: val }))}
              >
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Pilih User" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((u) => (
                    <SelectItem key={u.id} value={String(u.id)}>
                      {u.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <input
                type="text"
                placeholder="Role (opsional)"
                className="border rounded px-3 py-2"
                value={formData.role}
                onChange={(e) => setFormData((p) => ({ ...p, role: e.target.value }))}
              />

              <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">
                Simpan
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Tabel */}
        <Card className="shadow-md border-0">
          <CardHeader>
            <CardTitle>Daftar Penugasan</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead>Tugas</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignments.data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-gray-500 py-6">
                      Belum ada penugasan
                    </TableCell>
                  </TableRow>
                ) : (
                  assignments.data.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell>{a.task.title}</TableCell>
                      <TableCell>{a.user.name}</TableCell>
                      <TableCell>{a.role || "-"}</TableCell>
                      <TableCell className="flex gap-2 justify-center">
                        <Button
                          size="sm"
                          variant="destructive"
                          className="bg-red-500 hover:bg-red-600 text-white"
                          onClick={() => handleDelete(a.id)}
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
