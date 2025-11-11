<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;


class ProjectController extends Controller
{
    /**
     * Tampilkan daftar project
     */
    public function index()
    {
        return Inertia::render('Projects/index', [
            'projects' => Project::latest()->paginate(10),
        ]);
    }

    /**
     * Simpan project baru
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'          => 'required|string|max:255',
            'description'    => 'nullable|string',
            'tanggal_mulai'  => 'nullable|date',
            'deadline'       => 'nullable|date',
            'file'           => 'nullable|file|max:4096',
        ]);

        if ($request->hasFile('file')) {
            $validated['file_path'] = $request->file('file')->store('projects', 'public');
        }

        $validated['status'] = 'belum dikerjakan';

        Project::create($validated);

        return redirect()->route('projects.index')
            ->with('success', 'Project berhasil ditambahkan');
    }

    /**
     * Update project
     */
    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title'          => 'required|string|max:255',
            'description'    => 'nullable|string',
            'tanggal_mulai'  => 'nullable|date',
            'tanggal_selesai'=> 'nullable|date',
            'deadline'       => 'nullable|date',
            'status'         => 'required|in:belum dikerjakan,proses,selesai',
            'file'           => 'nullable|file|max:4096',
        ]);

        if ($request->hasFile('file')) {
            if ($project->file_path && Storage::disk('public')->exists($project->file_path)) {
                Storage::disk('public')->delete($project->file_path);
            }
            $validated['file_path'] = $request->file('file')->store('projects', 'public');
        }

        $project->update($validated);

        return redirect()->route('projects.index')
            ->with('success', 'Project berhasil diperbarui');
    }

    /**
     * Hapus project
     */
    public function destroy(Project $project)
    {
        if ($project->file_path && Storage::disk('public')->exists($project->file_path)) {
            Storage::disk('public')->delete($project->file_path);
        }

        $project->delete();

        return redirect()->route('projects.index')
            ->with('success', 'Project berhasil dihapus');
    }

    /**
     * Halaman Manage Project
     */
    public function manage(Project $project)
    {
        // Load relasi task & task.user
        $project->load(['tasks.user']);

        $totalTasks = $project->tasks->count();
        $completedTasks = $project->tasks->where('status', 'selesai')->count();
        $progress = $totalTasks > 0 ? round(($completedTasks / $totalTasks) * 100) : 0;

        return Inertia::render('Projects/ManageJob', [
            'project' => $project,
            'progress' => $progress,
        ]);
    }
}
