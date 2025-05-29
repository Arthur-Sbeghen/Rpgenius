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
        Schema::create('tables_characters', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idTable'); 
            $table->unsignedBigInteger('idCharacter');
            $table->enum('characterType', ['player', 'npc']);
            $table->foreign('idTable')->references('id')->on('tables')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tables_characters');
    }
};
