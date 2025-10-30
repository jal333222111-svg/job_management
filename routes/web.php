<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\TrackingController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\ManageJobController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    //Dashboard
    Route::get('/dashboard', fn () => Inertia::render('dashboard'))->name('dashboard');

    //CRUD Users
    Route::resource('users', UserController::class)->except(['show', 'create', 'edit']);

    //CRUD Projects
    Route::resource('projects', ProjectController::class)->except(['show', 'create', 'edit']);

    //CRUD Tasks
    Route::resource('tasks', TaskController::class)->except(['show', 'create', 'edit']);

    //Tracking
    Route::get('/tracking', [TrackingController::class, 'index'])->name('tracking.index');

    //Reports
    Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');

    //Manage Job (Custom Route)
    Route::get('/projects/{id}/manage', [ManageJobController::class, 'show'])->name('projects.manage');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
