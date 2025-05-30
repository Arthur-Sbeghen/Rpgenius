<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FichaController;
use App\Http\Controllers\MesaController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('tables')->group(function () {
    Route::get('/', [MesaController::class, 'index']); // listagem
    Route::get('/{id}', [MesaController::class, 'show']); // Listagem específica
    Route::post('/', [MesaController::class, 'store']); // Adiciona registro
    Route::put('/{id}', [MesaController::class, 'update']); // Altera registro
    Route::delete('/{id}', [MesaController::class, 'destroy']); // "Apaga" registro (softdelete)
});

Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']); // Loga usuário
    Route::post('/register', [AuthController::class, 'register']); // Adiciona registro de autenticação
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword']); // Encaminha instruções para recuperação do registro
    Route::post('/reset-password', [AuthController::class, 'resetPassword']); // Altera a senha do registro
    Route::post('/logout', [AuthController::class, 'logout']); // Desloga usuário
    Route::post('/data', [AuthController::class, 'data']); // Mostra dados da autenticação (token)
});

Route::prefix('users')->group(function () {
    Route::get('/{id}', [UserController::class, 'show']); // Mostra dados do usuário
    Route::post('/create', [UserController::class, 'store']); // Adiciona registro
    Route::put('/{id}', [UserController::class, 'update']); // Altera dados básicos do registro
    Route::delete('/{id}', [UserController::class, 'destroy']); // Apaga registro
});

Route::prefix('fichas')->group(function () {
    Route::get('/', [FichaController::class, 'index']); // listagem
    Route::get('/{id}', [FichaController::class, 'show']); // Listagem específica
    Route::post('/', [FichaController::class, 'store']); // Adiciona registro
    Route::put('/{id}', [FichaController::class, 'update']); // Altera registro
    Route::delete('/{id}', [FichaController::class, 'destroy']); // "Apaga" registro (softdelete)
});