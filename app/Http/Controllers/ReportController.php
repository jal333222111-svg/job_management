<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {
        // Ambil semua project beserta relasi user dan pekerjaan (jobs/tasks)
        $projects = Project::with([
            'jobs.officer', // officer = user yang mengerjakan job
        ])
            ->orderBy('start_date', 'asc')
            ->get();

        // Jika ingin menampilkan juga ringkasan total project (optional)
        $summary = [
            'total' => $projects->count(),
            'selesai' => $projects->where('status', 'selesai')->count(),
            'proses' => $projects->where('status', 'proses')->count(),
            'belum' => $projects->where('status', 'belum di kerjakan')->count(),
        ];

        return Inertia::render('Reports/Index', [
            'projects' => $projects,
            'summary' => $summary,
        ]);
    }
}
