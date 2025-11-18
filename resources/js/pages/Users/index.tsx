import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Pencil, Trash2, Users, Plus } from "lucide-react";
import UserFormModal from "@/components/UserFormModal";

type User = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  position?: string;
  role: string; // direktur | divisi | staff
  is_active: boolean;
};

type Props = {
  users: User[];
};

export default function UserIndex() {
  const { users } = usePage().props as unknown as Props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Data Karyawan", href: "/users" },
  ];

  /** 🔍 Filter berdasarkan nama */
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /** 🔥 Kelompokkan berdasarkan role database baru */
  const groupedUsers = {
    direktur: filteredUsers.filter((u) => u.role === "direktur"),
    divisi: filteredUsers.filter((u) => u.role === "divisi"),
    staff: filteredUsers.filter((u) => u.role === "staff"),
  };

  /** ❌ Delete */
  const handleDelete = (id: number) => {
    if (confirm("Yakin ingin menghapus data ini?")) {
      router.delete(`/users/${id}`);
    }
  };

  /** 🧩 Render table reusable */
  const renderTable = (list: User[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nama</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Telepon</TableHead>
          <TableHead>Jabatan</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-center">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center text-gray-500">
              Belum ada data
            </TableCell>
          </TableRow>
        ) : (
          list.map((u) => (
            <TableRow key={u.id}>
              <TableCell>{u.name}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.phone || "-"}</TableCell>
              <TableCell>{u.position || "-"}</TableCell>
              <TableCell>
                {u.is_active ? (
                  <span className="px-2 py-1 text-xs rounded bg-green-200 text-green-800">
                    Aktif
                  </span>
                ) : (
                  <span className="px-2 py-1 text-xs rounded bg-red-200 text-red-800">
                    Nonaktif
                  </span>
                )}
              </TableCell>
              <TableCell className="flex gap-2 justify-center">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-indigo-500 text-indigo-600 hover:bg-indigo-100"
                  onClick={() => {
                    setSelectedUser(u);
                    setIsModalOpen(true);
                  }}
                >
                  <Pencil className="w-4 h-4" />
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  className="bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => handleDelete(u.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="px-8 py-4">

        {/* Header */}
        <div
          className="flex flex-col md:flex-row justify-between md:items-center gap-3 mb-6 
                     bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                     p-4 rounded-xl shadow-md"
        >
          <h1 className="text-xl font-bold flex items-center gap-2 text-white">
            <Users className="w-6 h-6" /> Manajemen User
          </h1>

          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Cari nama user..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 bg-white/90 border-0 shadow-sm focus:ring-2 focus:ring-pink-400"
            />

            <Button
              onClick={() => {
                setSelectedUser(null);
                setIsModalOpen(true);
              }}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <Plus className="w-4 h-4 mr-1" /> Tambah
            </Button>
          </div>
        </div>

        {/* Tabs Berdasarkan Role (DATABASE BARU) */}
        <Card>
          <CardHeader>
            <CardTitle>Data Karyawan</CardTitle>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="direktur">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="direktur">Direktur</TabsTrigger>
                <TabsTrigger value="divisi">Divisi</TabsTrigger>
                <TabsTrigger value="staff">Staff</TabsTrigger>
              </TabsList>

              <TabsContent value="direktur">
                {renderTable(groupedUsers.direktur)}
              </TabsContent>

              <TabsContent value="divisi">
                {renderTable(groupedUsers.divisi)}
              </TabsContent>

              <TabsContent value="staff">
                {renderTable(groupedUsers.staff)}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Modal */}
        <UserFormModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          user={selectedUser}
        />
      </div>
    </AppLayout>
  );
}
