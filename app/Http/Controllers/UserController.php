<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    // ✅ List user
    public function index()
    {
        $users = User::all()->map(function ($user) {
            return [
                'id'        => $user->id,
                'name'      => $user->name,
                'email'     => $user->email,
                'phone'     => $user->phone,
                'position'  => $user->position,
                'avatar'    => $user->avatar ? asset('storage/' . $user->avatar) : null,
                'role'      => $user->role ?? 'staff',
                'is_active' => $user->is_active ?? true,
                'last_login_at' => $user->last_login_at,
            ];
        });

        return Inertia::render('Users/index', [
            'users' => $users,
        ]);
    }

    // ✅ Simpan user baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'      => 'required|string|max:255',
            'email'     => 'required|string|email|max:255|unique:users',
            'phone'     => 'nullable|string|max:20',
            'position'  => 'nullable|string|max:100',
            'avatar'    => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'role'      => 'required|in:admin,manager,staff',
            'password'  => 'required|string|min:6|confirmed',
            'is_active' => 'boolean',
        ]);

        // upload avatar jika ada
        if ($request->hasFile('avatar')) {
            $validated['avatar'] = $request->file('avatar')->store('avatars', 'public');
        }

        $validated['password'] = Hash::make($validated['password']);

        User::create($validated);

        return redirect()->route('users.index')
            ->with('success', 'User berhasil ditambahkan');
    }

    // ✅ Update user
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name'      => 'required|string|max:255',
            'email'     => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'phone'     => 'nullable|string|max:20',
            'position'  => 'nullable|string|max:100',
            'avatar'    => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'role'      => 'required|in:admin,manager,staff',
            'is_active' => 'boolean',
            'password'  => 'nullable|string|min:6|confirmed',
        ]);

        // update password jika diisi
        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        // update avatar jika ada upload baru
        if ($request->hasFile('avatar')) {
            // hapus avatar lama
            if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
                Storage::disk('public')->delete($user->avatar);
            }
            $validated['avatar'] = $request->file('avatar')->store('avatars', 'public');
        }

        $user->update($validated);

        return redirect()->route('users.index')
            ->with('success', 'User berhasil diperbarui');
    }

    // ✅ Hapus user
    public function destroy(User $user)
    {
        // hapus avatar jika ada
        if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
            Storage::disk('public')->delete($user->avatar);
        }

        $user->delete();

        return redirect()->route('users.index')
            ->with('success', 'User berhasil dihapus');
    }
}
