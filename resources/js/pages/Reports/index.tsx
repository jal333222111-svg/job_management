import { usePage } from "@inertiajs/react";
import { FileText } from "lucide-react";
import AppLayout from "@/layouts/app-layout";

type User = { id: number; name: string };

type Job = {
  id: number;
  title: string;
  status: string;
  due_date?: string | null;
  officer?: User;
};

type Project = {
  id: number;
  title: string;
  tingkatan: "mudah" | "sedang" | "susah";
  status: "belum di kerjakan" | "proses" | "selesai";
  start_date?: string | null;
  end_date?: string | null;
  jobs?: Job[];
};

export default function ReportPrint() {
  const { projects } = usePage().props as { projects: { data: Project[] } };

  return (
    <AppLayout breadcrumbs={[{ title: "Cetak Laporan", href: "/reports/print" }]}>      
      <div className="p-6 space-y-6 print:p-0">
        {/* Header */}
        <div className="flex justify-between items-center print:block print:text-center">
          <h1 className="text-xl font-bold flex items-center gap-2 print:block print:mb-4">
            <FileText className="w-6 h-6 text-blue-600 print:hidden" />
            Laporan Project dan Pekerjaan
          </h1>

          {/* Tombol Print */}
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 print:hidden"
          >
            Print
          </button>
        </div>

        {/* Tabel */}
        <div className="bg-white shadow-md rounded-xl p-4 overflow-x-auto print:shadow-none print:border-0 print:p-0">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 print:bg-gray-200 text-left">
                <th className="p-2 border text-center w-10">No</th>
                <th className="p-2 border">Judul Project</th>
                <th className="p-2 border text-center">Tingkatan</th>
                <th className="p-2 border text-center">Status Project</th>
                <th className="p-2 border text-center">Tanggal Mulai</th>
                <th className="p-2 border text-center">Tanggal Selesai</th>
                <th className="p-2 border">Nama Pekerjaan</th>
                <th className="p-2 border text-center">Status Pekerjaan</th>
                <th className="p-2 border text-center">Dikerjakan Oleh</th>
              </tr>
            </thead>
            <tbody>
              {projects.data.length > 0 ? (
                projects.data.map((project, i) => {
                  const jobCount = project.jobs?.length || 0;

                  if (jobCount === 0) {
                    return (
                      <tr key={project.id}>
                        <td className="p-2 border text-center">{i + 1}</td>
                        <td className="p-2 border">{project.title}</td>
                        <td className="p-2 border text-center capitalize">{project.tingkatan}</td>
                        <td className="p-2 border text-center">{project.status}</td>
                        <td className="p-2 border text-center">{project.start_date || "-"}</td>
                        <td className="p-2 border text-center">{project.end_date || "-"}</td>
                        <td className="p-2 border italic text-gray-400 text-center" colSpan={3}>Tidak ada pekerjaan</td>
                      </tr>
                    );
                  }

                  return project.jobs?.map((job, jIndex) => (
                    <tr key={`${project.id}-${job.id}`}>
                      {jIndex === 0 && (
                        <>
                          <td className="p-2 border text-center" rowSpan={jobCount}>{i + 1}</td>
                          <td className="p-2 border" rowSpan={jobCount}>{project.title}</td>
                          <td className="p-2 border text-center capitalize" rowSpan={jobCount}>{project.tingkatan}</td>
                          <td className="p-2 border text-center" rowSpan={jobCount}>{project.status}</td>
                          <td className="p-2 border text-center" rowSpan={jobCount}>{project.start_date || "-"}</td>
                          <td className="p-2 border text-center" rowSpan={jobCount}>{project.end_date || "-"}</td>
                        </>
                      )}
                      <td className="p-2 border">{job.title}</td>
                      <td className="p-2 border text-center">{job.status}</td>
                      <td className="p-2 border text-center">{job.officer?.name || "-"}</td>
                    </tr>
                  ));
                })
              ) : (
                <tr>
                  <td colSpan={9} className="text-center text-gray-500 py-4 border">Tidak ada data project</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
