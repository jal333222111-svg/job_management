<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {

        // Ambil semua project beserta relasi user dan pekerjaan (jobs/tasks)
        $projects = Project::with([
            'jobs.officer', // officer = user yang mengerjakan job
        ])
            ->orderBy('created_at', 'asc')
            ->get();

        $totalProjects = Project::count();
        $totalTasks = Task::count();
        $completedTasks = Task::where('status', 'completed')->count();
        $pendingTasks = Task::where('status', 'pending')->count();


        $latestProjects = Project::orderBy('id', 'desc')->take(5)->get();
        $latestTasks = Task::orderBy('id', 'desc')->take(5)->get();

        return Inertia::render('reports/index', [
            'totalProjects' => $totalProjects,
            'totalTasks' => $totalTasks,
            'completedTasks' => $completedTasks,
            'pendingTasks' => $pendingTasks,
            'latestProjects' => $latestProjects,
            'latestTasks' => $latestTasks,
        ]);
    }
}
