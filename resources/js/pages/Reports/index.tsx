import AppLayout from "@/layouts/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

type Task = {
  id: number;
  title: string;
  deadline: string | null;
  priority: string;
  status: string;
};

type Props = {
  statusSummary: Record<string, number>;
  prioritySummary: Record<string, number>;
  upcomingDeadlines: Task[];
};

export default function index({ statusSummary, prioritySummary, upcomingDeadlines }: Props) {
  const COLORS = ["#6366F1", "#FACC15", "#22C55E", "#EF4444", "#A855F7"];

  const statusData = Object.entries(statusSummary).map(([name, value]) => ({
    name,
    value,
  }));

  const priorityData = Object.entries(prioritySummary).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <AppLayout breadcrumbs={[{ title: "Laporan", href: "/reports" }]}>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Grafik Status */}
        <Card>
          <CardHeader>
            <CardTitle>Ringkasan Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" labelLine={false} label outerRadius={80} dataKey="value">
                  {statusData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Grafik Prioritas */}
        <Card>
          <CardHeader>
            <CardTitle>Ringkasan Prioritas</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={priorityData} cx="50%" cy="50%" labelLine={false} label outerRadius={80} dataKey="value">
                  {priorityData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Deadline Terdekat */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Deadline Terdekat (7 Hari ke Depan)</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Judul</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Prioritas</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingDeadlines.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-gray-500 py-4">
                      Tidak ada deadline dalam 7 hari ke depan
                    </TableCell>
                  </TableRow>
                ) : (
                  upcomingDeadlines.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>{task.title}</TableCell>
                      <TableCell>{task.deadline}</TableCell>
                      <TableCell>{task.priority}</TableCell>
                      <TableCell>{task.status}</TableCell>
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
