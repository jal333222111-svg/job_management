<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrackingController extends Controller
{
    public function index(Request $request)
    {
        // Ambil safe input
        $projectId = $request->integer('project_id');
        $status = $request->get('status'); // baru | proses | selesai

        // Query task lengkap
        $query = Task::with(['user', 'project'])->latest();

        // Filter by project
        if ($projectId) {
            $query->where('project_id', $projectId);
        }

        // Filter by status (validasi manual)
        if (in_array($status, ['baru', 'proses', 'selesai'])) {
            $query->where('status', $status);
        }

        // Ambil data (tanpa pagination)
        $tasks = $query->get();

        // Dropdown Project
        $projects = Project::select('id', 'title')
            ->orderBy('title')
            ->get();

        return Inertia::render('Trackings/index', [
            'tasks'        => $tasks,
            'projects'     => $projects,
            'project_id'   => $projectId,
            'status_filter'=> $status,
        ]);
    }
}
