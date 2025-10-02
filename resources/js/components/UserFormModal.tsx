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
  phone?: string;
  position?: string;
  avatar?: File | null;
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
    phone: "",
    position: "",
    avatar: null,
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
        phone: user.phone || "",
        position: user.position || "",
        avatar: null,
        password: "",
        password_confirmation: "",
        role: user.role,
        is_active: user.is_active,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        position: "",
        avatar: null,
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, avatar: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone || "");
    data.append("position", formData.position || "");
    data.append("role", formData.role);
    data.append("is_active", formData.is_active ? "1" : "0");

    if (formData.password) {
      data.append("password", formData.password);
      data.append(
        "password_confirmation",
        formData.password_confirmation || ""
      );
    }

    if (formData.avatar) {
      data.append("avatar", formData.avatar);
    }

    const successMsg = user?.id
      ? "User berhasil diperbarui"
      : "User berhasil ditambahkan";

    const errorMsg = user?.id
      ? "Gagal memperbarui user"
      : "Gagal menambahkan user";

    if (user?.id) {
      router.post(`/users/${user.id}`, { _method: "put", ...data }, {
        forceFormData: true,
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
        forceFormData: true,
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

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <Input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm font-medium mb-1">Position</label>
            <Input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
            />
          </div>

          {/* Avatar */}
          <div>
            <label className="block text-sm font-medium mb-1">Avatar</label>
            <Input type="file" name="avatar" onChange={handleFileChange} />
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
            <label className="block text-sm font-medium mb-1">
              Konfirmasi Password
            </label>
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
