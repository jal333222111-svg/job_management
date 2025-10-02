<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssignmentController extends Controller
{
    public function index()
    {
        return Inertia::render('Assignments/index', [
            'assignments' => Assignment::with(['task', 'user'])->latest()->paginate(10),
            'tasks' => Task::select('id', 'title')->get(),
            'users' => User::select('id', 'name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'task_id' => 'required|exists:tasks,id',
            'user_id' => 'required|exists:users,id',
            'role'    => 'nullable|string|max:100',
        ]);

        Assignment::create($validated);

        return redirect()->route('assignments.index')->with('success', 'Penugasan berhasil ditambahkan');
    }

    public function update(Request $request, Assignment $assignment)
    {
        $validated = $request->validate([
            'task_id' => 'required|exists:tasks,id',
            'user_id' => 'required|exists:users,id',
            'role'    => 'nullable|string|max:100',
        ]);

        $assignment->update($validated);

        return redirect()->route('assignments.index')->with('success', 'Penugasan berhasil diperbarui');
    }

    public function destroy(Assignment $assignment)
    {
        $assignment->delete();
        return redirect()->route('assignments.index')->with('success', 'Penugasan berhasil dihapus');
    }
}
