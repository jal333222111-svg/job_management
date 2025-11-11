<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    /** 📋 Daftar tugas */
    public function index()
    {
        return Inertia::render('Tasks/index', [
            'tasks' => Task::with(['user', 'project'])
                ->latest()
                ->paginate(10),

            'users' => User::select('id', 'name')->get(),

            // hanya tampilkan project yang belum selesai
            'projects' => Project::select('id', 'title', 'deadline')
                ->where('status', '!=', 'selesai')
                ->get(),
        ]);
    }

    /** ➕ Tambah tugas */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id'  => 'required|exists:projects,id',
            'user_id'     => 'nullable|exists:users,id',
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'status'      => 'required|in:baru,proses,selesai',
            'tingkatan'   => 'required|in:mudah,sedang,susah',
            'start_date'  => 'nullable|date',
            'end_date'    => 'nullable|date',
        ]);

        // Ambil deadline dari project
        $project = Project::find($validated['project_id']);
        $validated['deadline'] = $project->deadline;

        // Jika status langsung "proses", isi tanggal mulai
        if ($validated['status'] === 'proses') {
            $validated['start_date'] = now();
        }

        // Jika status langsung "selesai", isi tanggal mulai & selesai
        if ($validated['status'] === 'selesai') {
            $validated['start_date'] = $validated['start_date'] ?? now();
            $validated['end_date'] = now();
        }

        Task::create($validated);

        return redirect()->route('tasks.index')
            ->with('success', 'Tugas berhasil ditambahkan');
    }

    /** ✏️ Update tugas */
    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'project_id'  => 'required|exists:projects,id',
            'user_id'     => 'nullable|exists:users,id',
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'status'      => 'required|in:baru,proses,selesai',
            'tingkatan'   => 'required|in:mudah,sedang,susah',
            'start_date'  => 'nullable|date',
            'end_date'    => 'nullable|date',
        ]);

        // Ambil deadline dari project
        $project = Project::find($validated['project_id']);
        $validated['deadline'] = $project->deadline;

        // Atur otomatis start_date & end_date
        if ($validated['status'] === 'proses' && $task->start_date === null) {
            $validated['start_date'] = now();
        }

        if ($validated['status'] === 'selesai') {
            $validated['start_date'] = $task->start_date ?? now();
            $validated['end_date'] = now();
        }

        $task->update($validated);

        return redirect()->route('tasks.index')
            ->with('success', 'Tugas berhasil diperbarui');
    }

    /** ❌ Hapus tugas */
    public function destroy(Task $task)
    {
        $task->delete();

        return redirect()->route('tasks.index')
            ->with('success', 'Tugas berhasil dihapus');
    }
}
