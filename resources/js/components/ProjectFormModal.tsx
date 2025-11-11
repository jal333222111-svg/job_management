import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const [deadline, setDeadline] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description || "");
      setDeadline(project.deadline || "");
      setFile(null);
    } else {
      resetForm();
    }
  }, [project]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDeadline("");
    setFile(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("deadline", deadline || "");
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
          <DialogTitle>{project ? "Edit Project" : "Tambah Project"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Judul */}
          <div>
            <label className="text-sm font-medium">Judul Project</label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="text-sm font-medium">Deskripsi</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* File */}
          <div>
            <label className="text-sm font-medium">File Pendukung</label>
            <Input
              type="file"
              onChange={(e) =>
                setFile(e.target.files?.length ? e.target.files[0] : null)
              }
            />
            {project?.file_path && (
              <p className="text-xs text-gray-500 mt-1">
                File saat ini:{" "}
                <a
                  href={`/storage/${project.file_path}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Lihat File
                </a>
              </p>
            )}
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
