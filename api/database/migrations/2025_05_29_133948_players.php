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
        Schema::create('players', function (Blueprint $table) {
            $table->id(); 
            $table->unsignedBigInteger('idUser');
            $table->unsignedBigInteger('idTable');
            $table->boolean('isMaster');
            $table->foreign('idUser')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('idTable')->references('id')->on('tables')->onDelete('cascade');
        });
    }
        /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('players');
    }
};
