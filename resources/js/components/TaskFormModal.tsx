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
  deadline?: string | null;
  priority: "rendah" | "sedang" | "tinggi";
  status: "baru" | "proses" | "selesai";
  assigned_to?: number | null;
  project_id?: number | null;
};

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  task?: Task | null;
  users: { id: number; name: string }[];
}

export default function TaskFormModal({ isOpen, closeModal, task, users }: Props) {
  const [formData, setFormData] = useState<Task>({
    title: "",
    description: "",
    deadline: "",
    priority: "sedang",
    status: "baru",
    assigned_to: null,
    project_id: null,
  });

  useEffect(() => {
    if (task) {
      setFormData({
        id: task.id,
        title: task.title,
        description: task.description || "",
        deadline: task.deadline || "",
        priority: task.priority,
        status: task.status,
        assigned_to: task.assigned_to ?? null,
        project_id: task.project_id ?? null,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        deadline: "",
        priority: "sedang",
        status: "baru",
        assigned_to: null,
        project_id: null,
      });
    }
  }, [task]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const successMsg = task?.id ? "Pekerjaan berhasil diperbarui" : "Pekerjaan berhasil ditambahkan";
    const errorMsg = task?.id ? "Gagal memperbarui pekerjaan" : "Gagal menambahkan pekerjaan";

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
          <DialogTitle>{task ? "Edit Pekerjaan" : "Tambah Pekerjaan"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div>
            <label className="block text-sm font-medium mb-1">Deskripsi</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded p-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Deadline</label>
            <Input
              type="date"
              name="deadline"
              value={formData.deadline || ""}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Prioritas</label>
            <Select
              value={formData.priority}
              onValueChange={(val) => setFormData((prev) => ({ ...prev, priority: val as Task["priority"] }))}
            >
              <SelectTrigger><SelectValue placeholder="Pilih Prioritas" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="rendah">Rendah</SelectItem>
                <SelectItem value="sedang">Sedang</SelectItem>
                <SelectItem value="tinggi">Tinggi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <Select
              value={formData.status}
              onValueChange={(val) => setFormData((prev) => ({ ...prev, status: val as Task["status"] }))}
            >
              <SelectTrigger><SelectValue placeholder="Pilih Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="baru">Baru</SelectItem>
                <SelectItem value="proses">Proses</SelectItem>
                <SelectItem value="selesai">Selesai</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Penanggung Jawab</label>
            <Select
              value={formData.assigned_to ? String(formData.assigned_to) : ""}
              onValueChange={(val) => setFormData((prev) => ({ ...prev, assigned_to: Number(val) }))}
            >
              <SelectTrigger><SelectValue placeholder="Pilih User" /></SelectTrigger>
              <SelectContent>
                {users.map((u) => (
                  <SelectItem key={u.id} value={String(u.id)}>{u.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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
