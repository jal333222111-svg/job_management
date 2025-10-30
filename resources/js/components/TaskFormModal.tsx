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

type Task = {
  id?: number;
  title: string;
  description?: string;
  status: "baru" | "proses" | "selesai";
  user_id?: number | null;
  project_id: number | null;
};

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  task?: Task | null;
  users: { id: number; name: string }[];
  projects: { id: number; title: string }[];
}

export default function TaskFormModal({
  isOpen,
  closeModal,
  task,
  users,
  projects,
}: Props) {
  const [formData, setFormData] = useState<Task>({
    title: "",
    description: "",
    status: "baru",
    user_id: null,
    project_id: null,
  });

  useEffect(() => {
    if (task) {
      setFormData({
        id: task.id,
        title: task.title,
        description: task.description || "",
        status: task.status,
        user_id: task.user_id ?? null,
        project_id: task.project_id ?? null,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        status: "baru",
        user_id: null,
        project_id: null,
      });
    }
  }, [task]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const successMsg = task?.id
      ? "Tugas berhasil diperbarui"
      : "Tugas berhasil ditambahkan";
    const errorMsg = task?.id
      ? "Gagal memperbarui tugas"
      : "Gagal menambahkan tugas";

    if (task?.id) {
      router.put(`/tasks/${task.id}`, formData, {
        onSuccess: () => {
          toast.success(successMsg);
          closeModal();
          router.reload();
        },
        onError: () => toast.error(errorMsg),
      });
    } else {
      router.post(`/tasks`, formData, {
        onSuccess: () => {
          toast.success(successMsg);
          closeModal();
          router.reload();
        },
        onError: () => toast.error(errorMsg),
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{task ? "Edit Tugas" : "Tambah Tugas"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Judul */}
          <div>
            <label className="block text-sm font-medium mb-1">Judul</label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-medium mb-1">Deskripsi</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded p-2 text-sm"
            />
          </div>

          {/* Project */}
          <div>
            <label className="block text-sm font-medium mb-1">Project</label>
            <Select
              value={formData.project_id ? String(formData.project_id) : ""}
              onValueChange={(val) =>
                setFormData((prev) => ({
                  ...prev,
                  project_id: Number(val),
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((p) => (
                  <SelectItem key={p.id} value={String(p.id)}>
                    {p.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Penanggung Jawab */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Penanggung Jawab
            </label>
            <Select
              value={formData.user_id ? String(formData.user_id) : ""}
              onValueChange={(val) =>
                setFormData((prev) => ({ ...prev, user_id: Number(val) }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih User" />
              </SelectTrigger>
              <SelectContent>
                {users.map((u) => (
                  <SelectItem key={u.id} value={String(u.id)}>
                    {u.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <Select
              value={formData.status}
              onValueChange={(val) =>
                setFormData((prev) => ({
                  ...prev,
                  status: val as Task["status"],
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="baru">Baru</SelectItem>
                <SelectItem value="proses">Proses</SelectItem>
                <SelectItem value="selesai">Selesai</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tombol Aksi */}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={closeModal}>
              Batal
            </Button>
            <Button type="submit">{task ? "Ubah" : "Simpan"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
