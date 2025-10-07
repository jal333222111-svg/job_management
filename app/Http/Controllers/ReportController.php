<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {
        // Hitung jumlah task per status
        $statusSummary = Task::selectRaw('status, COUNT(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status');

        // Hitung jumlah task per prioritas
        $prioritySummary = Task::selectRaw('priority, COUNT(*) as total')
            ->groupBy('priority')
            ->pluck('total', 'priority');

        // Deadline terdekat (7 hari ke depan)
        $upcomingDeadlines = Task::whereNotNull('deadline')
            ->where('deadline', '>=', now())
            ->where('deadline', '<=', now()->addDays(7))
            ->orderBy('deadline', 'asc')
            ->take(5)
            ->get();

        return Inertia::render('Reports/index', [
            'statusSummary'   => $statusSummary,
            'prioritySummary' => $prioritySummary,
            'upcomingDeadlines' => $upcomingDeadlines,
        ]);
    }
}
