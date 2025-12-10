import { useState } from "react";
import AppLayout from "@/layouts/app-layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { type BreadcrumbItem } from "@/types";
import { Clock, CheckCircle2, Loader2, ChevronsUpDown } from "lucide-react";
import { Combobox } from "@headlessui/react";

type Project = {
  id: number;
  title: string;
};

type Task = {
  id: number;
  title: string;
  description?: string;
  status: "baru" | "proses" | "selesai";
  user?: { id: number; name: string };
  project?: { id: number; title: string };
};

export default function Tracking({
  tasks,
  projects,
}: {
  tasks: Task[];
  projects: Project[];
}) {
  const [filter, setFilter] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Tracking", href: "/tracking" },
  ];

  // 🔍 Filter project berdasarkan pencarian
  const filteredProjects =
    query === ""
      ? projects
      : projects.filter((p) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        );

  // 🎯 Filter tasks berdasarkan project
  const projectFiltered = !selectedProject
    ? tasks
    : tasks.filter((t) => t.project?.id === selectedProject.id);

  // 🎯 Filter tasks berdasarkan status
  const statusFiltered =
    filter === "all"
      ? projectFiltered
      : projectFiltered.filter((t) => t.status === filter);

  const filteredTasks = statusFiltered;

  // 🎨 Badge status
  const getStatusBadge = (status: Task["status"]) => {
    switch (status) {
      case "baru":
        return <Badge className="bg-gray-400 text-white">Baru</Badge>;
      case "proses":
        return (
          <Badge className="bg-blue-500 text-white flex items-center gap-1">
            <Loader2 className="w-3 h-3 animate-spin" /> Proses
          </Badge>
        );
      case "selesai":
        return (
          <Badge className="bg-green-500 text-white flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Selesai
          </Badge>
        );
    }
  };

  const getProgress = (status: Task["status"]) => {
    switch (status) {
      case "baru":
        return 10;
      case "proses":
        return 60;
      case "selesai":
        return 100;
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="px-8 py-4">
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-xl">
            <CardTitle className="text-white font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5" /> Tracking Pekerjaan
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* 🔎 Searchable Project Dropdown */}
            <div>
              <h3 className="font-semibold mb-2">Pilih Project</h3>

              <Combobox
                value={selectedProject}
                onChange={(value) => {
                  setSelectedProject(value);
                  setQuery(""); // reset pencarian
                }}
              >
                <div className="relative">
                  <Combobox.Input
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring"
                    placeholder="Cari atau pilih project..."
                    onChange={(e) => setQuery(e.target.value)}
                    displayValue={(project: Project | null) =>
                      project ? project.title : ""
                    }
                  />

                  <ChevronsUpDown className="w-4 h-4 absolute right-3 top-3 text-gray-500" />

                  <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white shadow-lg z-20 border">
                    {filteredProjects.length === 0 ? (
                      <div className="px-3 py-2 text-gray-500">
                        Tidak ditemukan…
                      </div>
                    ) : (
                      filteredProjects.map((project) => (
                        <Combobox.Option
                          key={project.id}
                          value={project}
                          className={({ active }) =>
                            `cursor-pointer select-none px-4 py-2 ${
                              active
                                ? "bg-blue-600 text-white"
                                : "text-gray-900"
                            }`
                          }
                        >
                          {project.title}
                        </Combobox.Option>
                      ))
                    )}
                  </Combobox.Options>
                </div>
              </Combobox>
            </div>

            {/* Filter Status */}
            <div>
              <h3 className="font-semibold mb-2">Filter Status</h3>

              <div className="flex gap-3 mb-4 flex-wrap">
                {[
                  { key: "all", label: "Semua" },
                  { key: "baru", label: "Baru" },
                  { key: "proses", label: "Proses" },
                  { key: "selesai", label: "Selesai" },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setFilter(key)}
                    className={`px-4 py-2 rounded-lg transition-all duration-150 ${
                      filter === key
                        ? "bg-purple-600 text-white"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Judul</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Penanggung Jawab</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredTasks.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-6 text-gray-500"
                    >
                      Tidak ada pekerjaan untuk filter ini
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTasks.map((task) => (
                    <TableRow key={task.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{task.title}</TableCell>
                      <TableCell>{task.project?.title || "-"}</TableCell>
                      <TableCell>{task.user?.name || "Belum ditugaskan"}</TableCell>
                      <TableCell>{getStatusBadge(task.status)}</TableCell>
                      <TableCell>
                        <Progress value={getProgress(task.status)} />
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
