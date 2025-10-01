import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

type Project = {
  id?: number;
  title: string;
  description: string | null;
  deadline: string | null;
  tingkatan: "mudah" | "sedang" | "susah";
  status: "belum di kerjakan" | "proses" | "selesai";
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  project?: Project | null;
};

export default function ProjectFormModal({ isOpen, onClose, project }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Project["status"]>("belum di kerjakan");
  const [deadline, setDeadline] = useState("");
  const [tingkatan, setTingkatan] = useState<Project["tingkatan"]>("sedang");

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description || "");
      setStatus(project.status);
      setDeadline(project.deadline || "");
      setTingkatan(project.tingkatan);
    } else {
      resetForm();
    }
  }, [project]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStatus("belum di kerjakan");
    setDeadline("");
    setTingkatan("sedang");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (project?.id) {
      router.put(`/projects/${project.id}`, {
        title,
        description,
        status,
        deadline: deadline || null,
        tingkatan,
      });
    } else {
      router.post("/projects", {
        title,
        description,
        status,
        deadline: deadline || null,
        tingkatan,
      });
    }

    onClose();
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{project ? "Edit Project" : "Tambah Project"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            type="text"
            placeholder="Judul project"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Input
            type="text"
            placeholder="Deskripsi project"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Status Dropdown */}
          <Select value={status} onValueChange={(val) => setStatus(val as Project["status"])}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="belum di kerjakan">Belum dikerjakan</SelectItem>
              <SelectItem value="proses">Proses</SelectItem>
              <SelectItem value="selesai">Selesai</SelectItem>
            </SelectContent>
          </Select>

          {/* Tingkatan Dropdown */}
          <Select value={tingkatan} onValueChange={(val) => setTingkatan(val as Project["tingkatan"])}>
            <SelectTrigger>
              <SelectValue placeholder="Tingkat kesulitan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mudah">Mudah</SelectItem>
              <SelectItem value="sedang">Sedang</SelectItem>
              <SelectItem value="susah">Susah</SelectItem>
            </SelectContent>
          </Select>

          {/* Deadline */}
          <Input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />

          <DialogFooter>
            <Button type="submit">{project ? "Update" : "Tambah"}</Button>
            <Button type="button" variant="secondary" onClick={onClose}>
              Batal
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
