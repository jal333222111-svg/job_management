<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    // Menampilkan daftar project
    public function index()
    {
        return Inertia::render('Projects/index', [ // huruf besar sesuai folder
            'projects' => Project::latest()->paginate(10),
        ]);
    }

    // Menyimpan project baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'deadline'    => 'nullable|date',
            'tingkatan'   => 'required|in:mudah,sedang,susah',
            'status'      => 'required|in:belum di kerjakan,proses,selesai',
        ]);

        Project::create($validated);

        return redirect()->route('projects.index')
            ->with('success', 'Project berhasil ditambahkan');
    }

    // Update project
    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'deadline'    => 'nullable|date',
            'tingkatan'   => 'required|in:mudah,sedang,susah',
            'status'      => 'required|in:belum di kerjakan,proses,selesai',
        ]);

        $project->update($validated);

        return redirect()->route('projects.index')
            ->with('success', 'Project berhasil diperbarui');
    }

    // Hapus project
    public function destroy(Project $project)
    {
        $project->delete();

        return redirect()->route('projects.index')
            ->with('success', 'Project berhasil dihapus');
    }
}
