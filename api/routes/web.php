<?php

use App\Http\Controllers\FichaController;
use App\Http\Controllers\MesaController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});