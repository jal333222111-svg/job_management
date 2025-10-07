<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // judul pekerjaan
            $table->text('description')->nullable(); // deskripsi pekerjaan
            $table->date('deadline')->nullable(); // tenggat waktu
            $table->enum('priority', ['rendah', 'sedang', 'tinggi'])->default('sedang'); // prioritas
            $table->enum('status', ['baru', 'proses', 'selesai'])->default('baru'); // status
            $table->foreignId('assigned_to')->nullable()->constrained('users')->nullOnDelete(); // penanggung jawab
            $table->timestamps(); // created_at, updated_at

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
