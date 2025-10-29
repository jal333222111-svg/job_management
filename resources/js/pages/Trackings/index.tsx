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
import { Clock, CheckCircle2, Loader2 } from "lucide-react";

type Task = {
  id: number;
  title: string;
  description?: string;
  status: "baru" | "proses" | "selesai";
  user?: { id: number; name: string };
  project?: { id: number; title: string };
};

export default function Tracking({ tasks }: { tasks: Task[] }) {
  const [filter, setFilter] = useState<string>("all");

  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Tracking", href: "/tracking" },
  ];

  // 🔍 Filter status tugas
  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((t) => t.status === filter);

  // 🎨 Badge status
  const getStatusBadge = (status: Task["status"]) => {
    switch (status) {
      case "baru":
        return (
          <Badge className="bg-gray-400 text-white font-medium">Baru</Badge>
        );
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

  // 📈 Persentase progress berdasarkan status
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
          {/* Header Card */}
          <CardHeader className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-xl">
            <CardTitle className="text-white font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5" /> Tracking Pekerjaan
            </CardTitle>
          </CardHeader>

          <CardContent>
            {/* Filter Status */}
            <div className="flex gap-3 mb-4 flex-wrap">
              {[
                { key: "all", label: "Semua", color: "blue" },
                { key: "baru", label: "Baru", color: "blue" },
                { key: "proses", label: "Proses", color: "blue" },
                { key: "selesai", label: "Selesai", color: "blue" },
              ].map(({ key, label, color }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-4 py-2 rounded-lg transition-all duration-150 ${
                    filter === key
                      ? `bg-${color}-600 text-white`
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Tabel Tracking */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Judul</TableHead>
                  <TableHead>Proyek</TableHead>
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
                      Tidak ada data tracking
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTasks.map((task) => (
                    <TableRow
                      key={task.id}
                      className="hover:bg-gray-50 transition"
                    >
                      <TableCell className="font-medium text-gray-800">
                        {task.title}
                      </TableCell>
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
