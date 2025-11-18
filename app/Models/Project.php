<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Carbon\Carbon;

class Project extends Model
{
    use HasFactory;

    protected $table = 'projects';

    protected $fillable = [
        'title',
        'description',
        'deadline',
        'status',
        'tanggal_mulai',
        'tanggal_selesai',
        'file_path',
    ];

    // DEFAULT ATTRIBUTE
    protected $attributes = [
        'status' => 'belum dikerjakan',
    ];

    /*
    |--------------------------------------------------------------------------
    | RELASI
    |--------------------------------------------------------------------------
    */
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    /*
    |--------------------------------------------------------------------------
    | ACCESSORS FORMAT TANGGAL
    |--------------------------------------------------------------------------
    */
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

    /*
    |--------------------------------------------------------------------------
    | ACCESSOR: File URL
    |--------------------------------------------------------------------------
    */
    public function getFileUrlAttribute()
    {
        return $this->file_path
            ? asset('storage/' . $this->file_path)
            : null;
    }
}
