import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  password_confirmation?: string;
  role: "admin" | "manager" | "staff";
  is_active: boolean;
}

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  user?: User | null;
}

export default function UserFormModal({ isOpen, closeModal, user }: Props) {
  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "staff",
    is_active: true,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id,
        name: user.name,
        email: user.email,
        password: "",
        password_confirmation: "",
        role: user.role,
        is_active: user.is_active,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "staff",
        is_active: true,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.password_confirmation,
      role: formData.role,
      is_active: formData.is_active,
    };

    const successMsg = user?.id
      ? "User berhasil diperbarui"
      : "User berhasil ditambahkan";

    const errorMsg = user?.id
      ? "Gagal memperbarui user"
      : "Gagal menambahkan user";

    if (user?.id) {
      router.put(`/users/${user.id}`, data, {
        onSuccess: () => {
          toast.success(successMsg);
          closeModal();
          router.reload();
        },
        onError: (errors) => {
          Object.values(errors).forEach((err) => toast.error(String(err)));
          toast.error(errorMsg);
        },
      });
    } else {
      router.post("/users", data, {
        onSuccess: () => {
          toast.success(successMsg);
          closeModal();
          router.reload();
        },
        onError: (errors) => {
          Object.values(errors).forEach((err) => toast.error(String(err)));
          toast.error(errorMsg);
        },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{user ? "Edit User" : "Tambah User"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={user ? "Kosongkan jika tidak diubah" : ""}
              {...(user ? {} : { required: true })}
            />
          </div>

          {/* Password Confirmation */}
          <div>
            <label className="block text-sm font-medium mb-1">Konfirmasi Password</label>
            <Input
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              placeholder={user ? "Kosongkan jika tidak diubah" : ""}
              {...(user ? {} : { required: true })}
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <Select
              value={formData.role}
              onValueChange={(val) =>
                setFormData((prev) => ({ ...prev, role: val as User["role"] }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) =>
                  setFormData({ ...formData, is_active: e.target.checked })
                }
              />
              Aktif
            </label>
          </div>

          {/* Tombol */}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={closeModal}>
              Batal
            </Button>
            <Button type="submit">{user ? "Ubah" : "Simpan"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
