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
import { Textarea } from "@/components/ui/textarea";

type Project = {
  id?: number;
  title: string;
  description: string | null;
  deadline: string | null;
  tingkatan: "mudah" | "sedang" | "susah";
  status: "belum di kerjakan" | "proses" | "selesai";
  file_path?: string | null;
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
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description || "");
      setStatus(project.status);
      setDeadline(project.deadline || "");
      setTingkatan(project.tingkatan);
      setFile(null);
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
    setFile(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("status", status);
    formData.append("deadline", deadline || "");
    formData.append("tingkatan", tingkatan);
    if (file) formData.append("file", file);

    if (project?.id) {
      formData.append("_method", "PUT");
      router.post(`/projects/${project.id}`, formData);
    } else {
      router.post("/projects", formData);
    }

    onClose();
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {project ? "Edit Project" : "Tambah Project"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Judul */}
          <div>
            <label className="text-sm font-medium">Judul Project</label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masukkan judul project"
              required
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="text-sm font-medium">Deskripsi</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Masukkan deskripsi project"
              rows={3}
            />
          </div>

          {/* Upload File */}
          <div>
            <label className="text-sm font-medium">Upload File</label>
            <Input
              type="file"
              onChange={(e) =>
                setFile(e.target.files && e.target.files.length > 0 ? e.target.files[0] : null)
              }
            />
            {project?.file_path && (
              <p className="text-xs text-gray-500 mt-1">
                File saat ini:{" "}
                <a
                  href={`/storage/${project.file_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Lihat File
                </a>
              </p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium">Status</label>
            <Select
              value={status}
              onValueChange={(val) => setStatus(val as Project["status"])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="belum di kerjakan">Belum dikerjakan</SelectItem>
                <SelectItem value="proses">Proses</SelectItem>
                <SelectItem value="selesai">Selesai</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tingkatan */}
          <div>
            <label className="text-sm font-medium">Tingkat Kesulitan</label>
            <Select
              value={tingkatan}
              onValueChange={(val) => setTingkatan(val as Project["tingkatan"])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih tingkat kesulitan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mudah">Mudah</SelectItem>
                <SelectItem value="sedang">Sedang</SelectItem>
                <SelectItem value="susah">Susah</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Deadline */}
          <div>
            <label className="text-sm font-medium">Deadline</label>
            <Input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>

          <DialogFooter className="mt-4">
            <Button type="submit" className="w-full">
              {project ? "Update Project" : "Tambah Project"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={onClose}
            >
              Batal
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
