<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Project counts
        $totalProjects     = Project::count();
        $belumProjects     = Project::where('status', 'belum dikerjakan')->count();
        $prosesProjects    = Project::where('status', 'proses')->count();
        $selesaiProjects   = Project::where('status', 'selesai')->count();

        // Task counts
        $totalTasks        = Task::count();
        $baruTasks         = Task::where('status', 'baru')->count();
        $prosesTasks       = Task::where('status', 'proses')->count();
        $selesaiTasks      = Task::where('status', 'selesai')->count();

        // Deadline terdekat
        $nearestDeadline = Project::whereNotNull('deadline')
            ->orderBy('deadline', 'asc')
            ->first();

        return Inertia::render('Dashboard/index', [
            'stats' => [
                'totalProjects'   => $totalProjects,
                'belumProjects'   => $belumProjects,
                'prosesProjects'  => $prosesProjects,
                'selesaiProjects' => $selesaiProjects,

                'totalTasks'      => $totalTasks,
                'baruTasks'       => $baruTasks,
                'prosesTasks'     => $prosesTasks,
                'selesaiTasks'    => $selesaiTasks,
            ],
            'nearestDeadline' => $nearestDeadline,
        ]);
    }
}
