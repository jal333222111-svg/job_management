<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Laravel\Fortify\Fortify;

class FortifyServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // ========== DISABLE TWO FACTOR AUTHENTICATION ==========
        // Fortify::twoFactorChallengeView(fn () => Inertia::render('auth/two-factor-challenge'));
        // RateLimiter::for('two-factor', function (Request $request) {
        //     return Limit::perMinute(5)->by($request->session()->get('login.id'));
        // });
        // ========================================================

        // Masih boleh: confirm password view
        Fortify::confirmPasswordView(fn () => Inertia::render('auth/confirm-password'));
    }
}
