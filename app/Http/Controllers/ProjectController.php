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
            'projects' => Project::with(['owner', 'users'])->latest()->paginate(10),
            'users' => User::select('id', 'name')->get(), // untuk dropdown pemilik
        ]);
    }

    /**
     * Simpan project baru
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'deadline'    => 'nullable|date',
            'tingkatan'   => 'required|in:mudah,sedang,susah',
            'status'      => 'required|in:belum di kerjakan,proses,selesai',
            'owner_id'    => 'nullable|exists:users,id',
            'file'        => 'nullable|file|max:2048',
            'user_ids'    => 'array|nullable',
            'user_ids.*'  => 'exists:users,id',
        ]);

        // Upload file jika ada
        if ($request->hasFile('file')) {
            $validated['file_path'] = $request->file('file')->store('projects', 'public');
        }

        // Simpan data project
        $project = Project::create($validated);

        // Hubungkan user-user yang terlibat (banyak user)
        if (!empty($validated['user_ids'])) {
            $project->users()->sync($validated['user_ids']);
        }

        return redirect()->route('projects.index')
            ->with('success', 'Project berhasil ditambahkan');
    }

    /**
     * Update project
     */
    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'deadline'    => 'nullable|date',
            'tingkatan'   => 'required|in:mudah,sedang,susah',
            'status'      => 'required|in:belum di kerjakan,proses,selesai',
            'owner_id'    => 'nullable|exists:users,id',
            'file'        => 'nullable|file|max:2048',
            'user_ids'    => 'array|nullable',
            'user_ids.*'  => 'exists:users,id',
        ]);

        // Hapus file lama jika ada file baru
        if ($request->hasFile('file')) {
            if ($project->file_path && Storage::disk('public')->exists($project->file_path)) {
                Storage::disk('public')->delete($project->file_path);
            }
            $validated['file_path'] = $request->file('file')->store('projects', 'public');
        }

        // Update data project
        $project->update($validated);

        // Update relasi user yang terlibat
        if (isset($validated['user_ids'])) {
            $project->users()->sync($validated['user_ids']);
        }

        return redirect()->route('projects.index')
            ->with('success', 'Project berhasil diperbarui');
    }

    /**
     * Hapus project
     */
    public function destroy(Project $project)
    {
        // Hapus file jika ada
        if ($project->file_path && Storage::disk('public')->exists($project->file_path)) {
            Storage::disk('public')->delete($project->file_path);
        }

        // Hapus relasi di pivot
        $project->users()->detach();

        // Hapus data project
        $project->delete();

        return redirect()->route('projects.index')
            ->with('success', 'Project berhasil dihapus');
    }

    /**
     * Tampilkan detail project + user + task (halaman manage)
     */
    public function show(Project $project)
    {
        $project->load(['owner', 'users', 'tasks.user']);

        // Hitung progress task
        $totalTasks = $project->tasks->count();
        $completedTasks = $project->tasks->where('status', 'selesai')->count();
        $progress = $totalTasks > 0 ? round(($completedTasks / $totalTasks) * 100) : 0;

        return Inertia::render('Projects/ManageJob', [
            'project'  => $project,
            'progress' => $progress,
        ]);
    }
}
