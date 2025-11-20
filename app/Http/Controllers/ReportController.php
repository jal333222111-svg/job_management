<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {
        // Statistik utama
        $totalProjects = Project::count();
        $totalTasks = Task::count();
        $completedTasks = Task::where('status', 'selesai')->count();
        $pendingTasks = Task::where('status', '!=', 'selesai')->count();

        // Proyek terbaru
        $latestProjects = Project::select('id', 'title', 'status')
            ->latest()
            ->take(5)
            ->get();

        // Task terbaru
        $latestTasks = Task::with('project:id,title')
            ->select('id', 'title', 'project_id', 'status')
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Reports/index', [
            'stats' => [
                'totalProjects' => $totalProjects,
                'totalTasks' => $totalTasks,
                'completedTasks' => $completedTasks,
                'pendingTasks' => $pendingTasks,
            ],
            'latestProjects' => $latestProjects,
            'latestTasks' => $latestTasks,
        ]);
    }
}
