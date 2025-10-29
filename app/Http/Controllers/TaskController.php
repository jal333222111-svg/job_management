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

            // 🔧 hanya tampilkan project yang belum selesai
            'projects' => Project::select('id', 'title')
                ->where('status', '!=', 'Selesai') // atau 'selesai' sesuai isi databasenya
                ->get(),
        ]);
    }

    /** ➕ Tambah tugas */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id'  => 'nullable|exists:projects,id',
            'user_id'     => 'nullable|exists:users,id',
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'status'      => 'required|in:baru,proses,selesai',
        ]);

        Task::create($validated);

        return redirect()->route('tasks.index')
            ->with('success', 'Tugas berhasil ditambahkan');
    }

    /** ✏️ Update tugas */
    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'project_id'  => 'nullable|exists:projects,id',
            'user_id'     => 'nullable|exists:users,id',
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'status'      => 'required|in:baru,proses,selesai',
        ]);

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
