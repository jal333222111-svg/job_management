<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrackingController extends Controller
{
    public function index()
    {
        // Ambil semua task + relasi user & project
        $tasks = Task::with(['user', 'project'])->latest()->get();

        return Inertia::render('Trackings/index', [
            'tasks' => $tasks,
        ]);
    }
}
