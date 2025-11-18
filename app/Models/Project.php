<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Project extends Model
{
    protected $fillable = [
        'title',
        'description',
        'deadline',
        'status',
        'tanggal_mulai',
        'tanggal_selesai',
        'file_path',
    ];

    // Relasi
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    // ACCESSORS FORMAT TANGGAL
    public function getTanggalMulaiFormattedAttribute()
    {
        return $this->tanggal_mulai
            ? Carbon::parse($this->tanggal_mulai)->translatedFormat('d F Y')
            : '-';
    }

    public function getTanggalSelesaiFormattedAttribute()
    {
        return $this->tanggal_selesai
            ? Carbon::parse($this->tanggal_selesai)->translatedFormat('d F Y')
            : '-';
    }

    public function getDeadlineFormattedAttribute()
    {
        return $this->deadline
            ? Carbon::parse($this->deadline)->translatedFormat('d F Y')
            : '-';
    }
}
