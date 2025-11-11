<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'file_path',
        'tanggal_mulai',
        'deadline',
        'status',
        'tanggal_selesai',
    ];

    /**
     * Relasi one-to-many ke Task
     * (Project memiliki banyak tugas)
     */
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
