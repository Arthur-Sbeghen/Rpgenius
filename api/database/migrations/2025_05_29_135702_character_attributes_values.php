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
        Schema::create('character_attributes_values', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idCharacter');
            $table->string('attribute_key');
            $table->string('value')->nullable();
            $table->string('currentValue')->nullable();
            $table->enum('entityType', ['player', 'npc']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('character_attributes_values');
    }
};
