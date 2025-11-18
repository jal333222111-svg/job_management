<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    /** ===========================
     *  UPDATE STATUS PROJECT
     *  =========================== */
    private function updateProjectStatus(Project $project)
    {
        $total = $project->tasks()->count();
        $done = $project->tasks()->where('status', 'selesai')->count();

        if ($total == 0) {
            $project->update(['status' => 'belum dikerjakan']);
            return;
        }

        if ($done == $total) {
            $project->update(['status' => 'selesai']);
            return;
        }

        $project->update(['status' => 'proses']);
    }

    /** 📋 Daftar tugas */
    public function index()
    {
        return Inertia::render('Tasks/index', [
            'tasks' => Task::with(['user', 'project'])
                ->latest()
                ->paginate(10),

            'users' => User::select('id', 'name')->get(),

            'projects' => Project::select('id', 'title', 'deadline')
                ->where('status', '!=', 'selesai')
                ->get(),
        ]);
    }

    /** ➕ Simpan tugas */
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

        $project = Project::findOrFail($validated['project_id']);

        $validated['deadline'] = $project->deadline;

        // otomatis tanggal mulai
        if ($validated['status'] === 'proses') {
            $validated['start_date'] = now();
        }

        // otomatis tanggal selesai
        if ($validated['status'] === 'selesai') {
            $validated['start_date'] = $validated['start_date'] ?? now();
            $validated['end_date'] = now();
        }

        $task = Task::create($validated);

        // update status project
        $this->updateProjectStatus($task->project);

        return redirect()->route('tasks.index')
            ->with('success', 'Tugas berhasil ditambahkan');
    }

    /** ✏ Update tugas */
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

        $project = Project::findOrFail($validated['project_id']);
        $validated['deadline'] = $project->deadline;

        // otomatis tanggal mulai
        if ($validated['status'] === 'proses' && $task->start_date === null) {
            $validated['start_date'] = now();
        }

        // otomatis tanggal selesai
        if ($validated['status'] === 'selesai') {
            $validated['start_date'] = $task->start_date ?? now();
            $validated['end_date'] = now();
        }

        $task->update($validated);

        // update project
        $this->updateProjectStatus($task->project);

        return redirect()->route('tasks.index')
            ->with('success', 'Tugas berhasil diperbarui');
    }

    /** ❌ Hapus */
    public function destroy(Task $task)
    {
        $project = $task->project;

        $task->delete();

        $this->updateProjectStatus($project);

        return redirect()->route('tasks.index')
            ->with('success', 'Tugas berhasil dihapus');
    }
}
