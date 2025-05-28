<?php

use App\Http\Controllers\MesaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('tables', [MesaController::class, 'index']);
Route::get('tables/{id}', [MesaController::class, 'show']);