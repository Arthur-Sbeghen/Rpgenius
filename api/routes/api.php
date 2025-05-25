<?php

use App\Http\Controllers\MesaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('mesas', [MesaController::class, 'index']);
Route::get('mesas/{id}', [MesaController::class, 'show']);