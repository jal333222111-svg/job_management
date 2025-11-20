<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::table('projects', function (Blueprint $table) {
        $table->enum('status', [
            'belum dikerjakan',
            'sedang dikerjakan',
            'selesai'
        ])->change();  
    });
}

public function down()
{
    Schema::table('projects', function (Blueprint $table) {
        // kembalikan ke enum lama (isi sesuai sebelumnya)
        $table->enum('status', ['pending', 'in_progress', 'done'])->change();
    });
}

};
