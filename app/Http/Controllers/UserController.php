<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Tampilkan daftar user
     */
    public function index()
    {
        $users = User::orderBy('id', 'desc')->get()
            ->map(fn($user) => [
                'id'            => $user->id,
                'name'          => $user->name,
                'email'         => $user->email,
                'phone'         => $user->phone,
                'position'      => $user->position,
                'role'          => $user->role,
                'is_active'     => $user->is_active,
                'last_login_at' => $user->last_login_at,
            ]);

        return Inertia::render('Users/index', [
            'users' => $users,
        ]);
    }

    /**
     * Simpan user baru
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'      => 'required|string|max:255',
            'email'     => 'required|email|max:255|unique:users,email',
            'phone'     => 'nullable|string|max:20',
            'position'  => 'nullable|string|max:100',
            'role'      => 'required|in:direktur,divisi,staff',
            'is_active' => 'boolean',
            'password'  => 'required|string|min:6|confirmed',
        ]);

        $validated['password'] = Hash::make($validated['password']);
        $validated['is_active'] = $validated['is_active'] ?? true;

        User::create($validated);

        return redirect()->route('users.index')
            ->with('success', 'User berhasil ditambahkan');
    }

    /**
     * Update user
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name'      => 'required|string|max:255',
            'email'     => 'required|email|max:255|unique:users,email,' . $user->id,
            'phone'     => 'nullable|string|max:20',
            'position'  => 'nullable|string|max:100',
            'role'      => 'required|in:direktur,divisi,staff',
            'is_active' => 'boolean',
            'password'  => 'nullable|string|min:6|confirmed',
        ]);

        // Jika password tidak diisi → jangan diupdate
        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        return redirect()->route('users.index')
            ->with('success', 'User berhasil diperbarui');
    }

    /**
     * Hapus user
     */
    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('users.index')
            ->with('success', 'User berhasil dihapus');
    }
}
