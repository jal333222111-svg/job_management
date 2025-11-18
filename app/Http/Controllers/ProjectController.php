<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class ProjectController extends Controller
{
    /**
     * Daftar Project
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
            'description'     => 'nullable|string',
            'deadline'        => 'nullable|date',
            'file'            => 'nullable|file|max:4096',
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
            'title'           => 'required|string|max:255',
            'description'     => 'nullable|string',
            'tanggal_mulai'   => 'nullable|date',
            'tanggal_selesai' => 'nullable|date',
            'deadline'        => 'nullable|date',
            'status'          => 'required|in:belum dikerjakan,proses,selesai',
            'file'            => 'nullable|file|max:4096',
        ]);

        // Handle file baru
        if ($request->hasFile('file')) {
            if ($project->file_path && Storage::disk('public')->exists($project->file_path)) {
                Storage::disk('public')->delete($project->file_path);
            }
            $validated['file_path'] = $request->file('file')->store('projects', 'public');
        }

        /**
         * === AUTO SET TANGGAL MULAI ===
         * Jika status berubah menjadi "proses" DAN tanggal_mulai masih kosong
         */
        if ($validated['status'] === 'proses' && !$project->tanggal_mulai) {
            $validated['tanggal_mulai'] = Carbon::today();
        }

        /**
         * === AUTO SET TANGGAL SELESAI ===
         * Jika status berubah menjadi "selesai"
         */
        if ($validated['status'] === 'selesai') {
            $validated['tanggal_selesai'] = Carbon::today();
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
     * === AUTO UPDATE STATUS BERDASARKAN TASK ===
     */
    private function updateProjectStatus(Project $project)
    {
        $totalTasks = $project->tasks()->count();
        $completedTasks = $project->tasks()->where('status', 'selesai')->count();

        if ($totalTasks == 0) {
            $project->update(['status' => 'belum dikerjakan']);
            return;
        }

        if ($completedTasks == $totalTasks) {
            // auto set tanggal selesai
            $project->update([
                'status' => 'selesai',
                'tanggal_selesai' => Carbon::today(),
            ]);
            return;
        }

        // auto set tanggal mulai jika masuk proses
        $project->update([
            'status' => 'proses',
            'tanggal_mulai' => $project->tanggal_mulai ?? Carbon::today(),
        ]);
    }

    /**
     * Halaman Manage Project
     */
    public function manage(Project $project)
    {
        $project->load(['tasks.user']);

        $this->updateProjectStatus($project);

        $totalTasks = $project->tasks->count();
        $completedTasks = $project->tasks->where('status', 'selesai')->count();
        $progress = $totalTasks > 0 ? round(($completedTasks / $totalTasks) * 100) : 0;

        return Inertia::render('Projects/ManageJob', [
            'project' => $project,
            'progress' => $progress,
        ]);
    }
}
