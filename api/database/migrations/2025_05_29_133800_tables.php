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
        Schema::create('tables', function (Blueprint $table) {
            $table->id();
            $table->string('invite_code', 8)->unique();
            $table->string('name');
            $table->unsignedBigInteger('idMaster');
            $table->text('image')->nullable();
            $table->integer('player_limit')->default(5)->max(10)->min(1);
            $table->unsignedBigInteger('idSystem')->nullable(); 
            $table->foreign('idMaster')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('idSystem')->references('id')->on('systems')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tables');
    }
};
