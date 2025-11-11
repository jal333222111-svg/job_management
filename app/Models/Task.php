<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'user_id',
        'title',
        'description',
        'status',      // belum di kerjakan | proses | selesai
        'tingkatan',   // mudah | sedang | susah
        'start_date',
        'end_date',
        'deadline',
    ];

    /**
     * Task milik 1 Project
     */
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    /**
     * Task dikerjakan oleh 1 User (boleh kosong)
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id')->withDefault([
            'name' => 'Belum ditugaskan',
        ]);
    }
}
