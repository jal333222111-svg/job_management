<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'project_id',
        'nama_tugas',
        'deskripsi',
        'status',
        'deadline',
    ];

    protected static function boot()
    {
        parent::boot();

        // Jika tugas dibuat → isi tanggal_mulai project
        static::created(function ($task) {
            if ($task->project->tanggal_mulai === null) {
                $task->project->update([
                    'tanggal_mulai' => now()->format('Y-m-d'),
                    'status' => 'proses'
                ]);
            }
        });

        // Jika tugas diupdate → cek apakah semua selesai
        static::updated(function ($task) {
            $project = $task->project;

            $totalTask = $project->tasks()->count();
            $doneTask = $project->tasks()->where('status', 'selesai')->count();

            if ($totalTask > 0 && $totalTask == $doneTask) {
                $project->update([
                    'tanggal_selesai' => now()->format('Y-m-d'),
                    'status' => 'selesai'
                ]);
            }
        });
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
