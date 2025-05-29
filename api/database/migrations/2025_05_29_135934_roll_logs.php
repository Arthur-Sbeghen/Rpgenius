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
        Schema::create('roll_logs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idPlayer'); 
            $table->string('rollResult'); 
            $table->timestamp('rollTime')->useCurrent(); 
            $table->foreign('idPlayer')->references('id')->on('players')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('roll_logs');
    }
};
