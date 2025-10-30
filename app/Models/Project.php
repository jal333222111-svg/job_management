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
        'owner_id',
        'deadline',
        'tingkatan',
        'status',
        'file_path',
    ];

    /**
     * Relasi many-to-many ke User
     * (user yang terlibat dalam project)
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'project_user')
            ->withTimestamps();
    }

    /**
     * Relasi one-to-many ke Task
     */
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    /**
     * Relasi ke user pemilik project
     */
    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }
}
