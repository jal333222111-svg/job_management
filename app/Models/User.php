<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable implements MustVerifyEmail // ✅ jika butuh verifikasi email
{
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * Kolom yang bisa diisi (mass assignment).
     */
    protected $fillable = [
        'name',
        'email',
        'phone',        // ✅ kontak/no hp
        'position',     // ✅ jabatan
        'avatar',       // ✅ foto profil
        'password',
        'role',
        'is_active',
        'last_login_at' // ✅ tracking login terakhir
    ];

    /**
     * Kolom yang disembunyikan saat serialisasi.
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    /**
     * Cast data ke tipe native.
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_active' => 'boolean',
        'last_login_at' => 'datetime',
    ];
    
}
