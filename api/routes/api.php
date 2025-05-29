<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContatoController;
use App\Http\Controllers\FichaController;
use App\Http\Controllers\MesaController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('tables')->group(function () {
    Route::get('/', [MesaController::class, 'index']);
    Route::get('/{id}', [MesaController::class, 'show']);
    Route::post('/', [MesaController::class, 'store']);
    Route::put('/{id}', [MesaController::class, 'update']);
    Route::delete('/{id}', [MesaController::class, 'destroy']);
});

Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/reset-password', [AuthController::class, 'resetPassword']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/data', [AuthController::class, 'data']);
});

Route::prefix('users')->group(function () {
    Route::get('/{id}', [UserController::class, 'show']);
    Route::post('/create', [UserController::class, 'store']);
    Route::put('/{id}', [UserController::class, 'update']);
    Route::delete('/{id}', [UserController::class, 'destroy']);
});

Route::prefix('fichas')->group(function () {
    Route::get('/', [FichaController::class, 'index']);
    Route::get('/{id}', [FichaController::class, 'show']);
    Route::post('/', [FichaController::class, 'store']);
    Route::put('/{id}', [FichaController::class, 'update']);
    Route::delete('/{id}', [FichaController::class, 'destroy']);
});