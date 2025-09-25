import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, Users, Plus } from "lucide-react";
import UserFormModal from "@/components/UserFormModal";

type User = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  position?: string;
  avatar?: string | null;
  role: string;
  is_active: boolean;
  last_login_at?: string | null;
};

export default function Index() {
  const { users } = usePage().props as { users: User[] };
  const [searchQuery, setSearchQuery] = useState<string>("");

  // state untuk modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Manajemen User", href: "/users" },
  ];

  // 🔹 Filter user sesuai pencarian
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: number) => {
    if (confirm("Yakin ingin menghapus user ini?")) {
      router.delete(`/users/${id}`);
    }
  };

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
            {/* Input search */}
            <Input
              type="text"
              placeholder="Cari nama user..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 bg-white/90 border-0 shadow-sm focus:ring-2 focus:ring-pink-400"
            />

            {/* Tombol Tambah Data */}
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

        {/* Tabel Data User */}
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-xl">
            <CardTitle className="font-semibold flex items-center gap-2 text-white">
              <Users className="w-5 h-5" /> Daftar User
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead>Avatar</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telepon</TableHead>
                  <TableHead>Jabatan</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center text-gray-500 py-6">
                      Belum ada data user
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((u) => (
                    <TableRow key={u.id} className="hover:bg-gray-50 transition">
                      {/* Avatar */}
                      <TableCell>
                        {u.avatar ? (
                          <img
                            src={u.avatar}
                            alt={u.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-500">
                            {u.name.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </TableCell>

                      <TableCell>{u.name}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>{u.phone || "-"}</TableCell>
                      <TableCell>{u.position || "-"}</TableCell>

                      <TableCell>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-indigo-100 text-indigo-700">
                          {u.role}
                        </span>
                      </TableCell>

                      <TableCell>
                        {u.is_active ? (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-green-200 text-green-800">
                            Aktif
                          </span>
                        ) : (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-red-200 text-red-800">
                            Nonaktif
                          </span>
                        )}
                      </TableCell>

                      <TableCell>{u.last_login_at || "-"}</TableCell>

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
          </CardContent>
        </Card>

        {/* Modal Form User */}
        <UserFormModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          user={selectedUser}
        />
      </div>
    </AppLayout>
  );
}
