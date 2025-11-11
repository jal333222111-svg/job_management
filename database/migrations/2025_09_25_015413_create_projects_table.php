<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            
            $table->string('title');
            $table->text('description')->nullable();

            // File pendukung, boleh kosong
            $table->string('file_path')->nullable();

            // Otomatis terisi ketika task pertama dibuat
            $table->date('tanggal_mulai')->nullable();

            // Deadline ditentukan ketika membuat project
            $table->date('deadline')->nullable();

            // Status progress project (pastikan konsisten di frontend)
            $table->enum('status', ['belum dikerjakan', 'proses', 'selesai'])->default('belum dikerjakan');

            // Akan otomatis terisi ketika semua task selesai
            $table->date('tanggal_selesai')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
