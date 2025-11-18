<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'project_id',
        'user_id',
        'title',
        'description',
        'status',
        'tingkatan',
        'start_date',
        'end_date',
        'deadline',
    ];

    protected static function boot()
    {
        parent::boot();

        // 🔥 Jika tugas dibuat
        static::created(function ($task) {
            $project = $task->project;

            // Isi tanggal mulai project jika belum ada
            if ($project->tanggal_mulai === null) {
                $project->update([
                    'tanggal_mulai' => now()->format('Y-m-d'),
                    'status' => 'proses'
                ]);
            }
        });

        // 🔥 Jika tugas diupdate
        static::updated(function ($task) {
            $project = $task->project;

            $total = $project->tasks()->count();
            $done = $project->tasks()->where('status', 'selesai')->count();

            // Jika semua task selesai
            if ($total > 0 && $total == $done) {
                $project->update([
                    'tanggal_selesai' => now()->format('Y-m-d'),
                    'status' => 'selesai'
                ]);
            }
        });
    }

    /** ============================ */
    /**          RELASI              */
    /** ============================ */

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
