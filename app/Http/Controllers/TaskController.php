<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    // 📌 List data pekerjaan
    public function index()
    {
        return Inertia::render('Tasks/index', [ // pastikan folder: resources/js/Pages/Tasks/Index.tsx
            'tasks' => Task::with(['user'])->latest()->paginate(10),
            'users' => User::select('id', 'name')->get(), // untuk dropdown penanggung jawab
        ]);
    }

    // 📌 Simpan pekerjaan baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'deadline'    => 'nullable|date',
            'priority'    => 'required|in:rendah,sedang,tinggi',
            'status'      => 'required|in:baru,proses,selesai',
            'assigned_to' => 'nullable|exists:users,id'
        ]);

        Task::create($validated);

        return redirect()->route('tasks.index')->with('success', 'Pekerjaan berhasil ditambahkan');
    }

    // 📌 Update pekerjaan
    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'deadline'    => 'nullable|date',
            'priority'    => 'required|in:rendah,sedang,tinggi',
            'status'      => 'required|in:baru,proses,selesai',
            'assigned_to' => 'nullable|exists:users,id',
        ]);

        $task->update($validated);

        return redirect()->route('tasks.index')->with('success', 'Pekerjaan berhasil diperbarui');
    }

    // 📌 Hapus pekerjaan
    public function destroy(Task $task)
    {
        $task->delete();

        return redirect()->route('tasks.index')->with('success', 'Pekerjaan berhasil dihapus');
    }
}
