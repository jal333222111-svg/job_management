import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<Project["status"]>("belum di kerjakan");
  const [deadline, setDeadline] = useState("");
  const [tingkatan, setTingkatan] = useState<Project["tingkatan"]>("sedang");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    router.post("/projects", {
      title,
      status,
      deadline: deadline || null,
      tingkatan,
    });

    setTitle("");
    setStatus("belum di kerjakan");
    setDeadline("");
    setTingkatan("sedang");
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
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2">
              <Input
                type="text"
                placeholder="Judul project"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              {/* Status Dropdown */}
              <Select value={status} onValueChange={(val) => setStatus(val as Project["status"])}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="belum di kerjakan">Belum dikerjakan</SelectItem>
                  <SelectItem value="proses">Proses</SelectItem>
                  <SelectItem value="selesai">Selesai</SelectItem>
                </SelectContent>
              </Select>

              {/* Tingkatan Dropdown */}
              <Select value={tingkatan} onValueChange={(val) => setTingkatan(val as Project["tingkatan"])}>
                <SelectTrigger>
                  <SelectValue placeholder="Tingkat kesulitan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mudah">Mudah</SelectItem>
                  <SelectItem value="sedang">Sedang</SelectItem>
                  <SelectItem value="susah">Susah</SelectItem>
                </SelectContent>
              </Select>

              {/* Deadline */}
              <Input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
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
                  <TableHead>Tingkatan</TableHead>
                  <TableHead>Deadline</TableHead>
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
                      <TableCell>{p.tingkatan}</TableCell>
                      <TableCell>{p.deadline || "-"}</TableCell>
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
