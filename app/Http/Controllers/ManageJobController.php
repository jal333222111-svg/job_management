<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Inertia\Inertia;

class ManageJobController extends Controller
{
    public function show($id)
    {
        // Ubah relasi dari 'employees' dan 'tasks.employee' ke 'users' dan 'tasks.user'
        $project = Project::with(['users', 'tasks.user'])->findOrFail($id);

        // Hitung progress berdasarkan task yang selesai
        $totalTasks = $project->tasks->count();
        $doneTasks = $project->tasks->where('status', 'selesai')->count();
        $progress = $totalTasks > 0 ? round(($doneTasks / $totalTasks) * 100, 1) : 0;

        return Inertia::render('Projects/ManageJob', [
            'project' => $project,
            'progress' => $progress,
        ]);
    }
}
