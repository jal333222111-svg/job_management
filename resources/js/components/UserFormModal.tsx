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
  password?: string;
  password_confirmation?: string;
  role: "direktur" | "divisi" | "staff";
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
    password: "",
    password_confirmation: "",
    role: "staff",
    is_active: true,
  });

  /** 🔁 Update form saat user berubah */
  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        position: user.position || "",
        password: "",
        password_confirmation: "",
        role: user.role,
        is_active: user.is_active,
      });
    } else {
      resetForm();
    }
  }, [user]);

  /** 🧹 Reset form */
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      position: "",
      password: "",
      password_confirmation: "",
      role: "staff",
      is_active: true,
    });
  };

  /** 📤 Submit form */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone || "");
    data.append("position", formData.position || "");
    data.append("role", formData.role);
    data.append("is_active", formData.is_active ? "1" : "0");

    // Password hanya dikirim jika diisi
    if (formData.password) {
      data.append("password", formData.password);
      data.append("password_confirmation", formData.password_confirmation || "");
    }

    const successMsg = user?.id
      ? "User berhasil diperbarui"
      : "User berhasil ditambahkan";

    const errorMsg = user?.id
      ? "Gagal memperbarui user"
      : "Gagal menambahkan user";

    if (user?.id) {
      // UPDATE USER
      data.append("_method", "put");
      router.post(`/users/${user.id}`, data, {
        forceFormData: true,
        onSuccess: () => {
          toast.success(successMsg);
          closeModal();
          resetForm();
          router.reload();
        },
        onError: (errors) => {
          Object.values(errors).forEach((err) => toast.error(String(err)));
          toast.error(errorMsg);
        },
      });
    } else {
      // CREATE USER
      router.post("/users", data, {
        forceFormData: true,
        onSuccess: () => {
          toast.success(successMsg);
          closeModal();
          resetForm();
          router.reload();
        },
        onError: (errors) => {
          Object.values(errors).forEach((err) => toast.error(String(err)));
          toast.error(errorMsg);
        },
      });
    }
  };

  /** 🧩 Input change */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /** 🧼 Modal close */
  const handleClose = () => {
    closeModal();
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{user ? "Edit User" : "Tambah User"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Nama</label>
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
            <label className="block text-sm font-medium mb-1">No. Telepon</label>
            <Input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm font-medium mb-1">Jabatan</label>
            <Input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Password {user && "(kosongkan jika tidak diganti)"}
            </label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              {...(user ? {} : { required: true })}
            />
          </div>

          {/* Password Confirmation */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Konfirmasi Password {user && "(opsional)"}
            </label>
            <Input
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              {...(user ? {} : { required: true })}
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <Select
              value={formData.role}
              onValueChange={(val) =>
                setFormData((prev) => ({
                  ...prev,
                  role: val as User["role"],
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="direktur">Direktur</SelectItem>
                <SelectItem value="divisi">Divisi</SelectItem>
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
                  setFormData({
                    ...formData,
                    is_active: e.target.checked,
                  })
                }
              />
              Aktif
            </label>
          </div>

          {/* Buttons */}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Batal
            </Button>
            <Button type="submit">{user ? "Ubah" : "Simpan"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
