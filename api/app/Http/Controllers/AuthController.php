<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller {
    
    //recebe via API (nome, email, senha, conf_senha)
    public function register (Request $request) {
        $data = $request->validate([
            "login" => "required|string",
            "email" => "required|email|unique:users,email",
            "password" => "required"
        ]);

        User::create($data);

        return response()->json([
            "status" => true,
            "message" => "Usuário criado com sucesso!"
        ]);
    }

    //recebe via API (email, senha)
    public function login (Request $request) {
        $request->validate([
            "email" => "required|email",
            "password" => "required"
        ]);

        if(!Auth::attempt($request->only("email", "password"))){
            return response()->json([
                "status" => false,
                "message" => "Credenciais inválidas",
            ]);
        }

        $user = Auth::user();
        $token = $user->createToken("myToken")->plainTextToken;

        return response()->json([
            "status" => true,
            "message" => "Usuário entrou",
            "token" => $token,
        ]);
    }

    public function profile () {
        $user = Auth::user();
        
        return response()->json([
            "status" => true,
            "message" => "Dados do perfil de usuário",
            "user "=> $user
        ]);
    }

    public function logout (Request $request) {
        Auth::logout();
        return response()->json([
            "status" => true,
            "message" => "Usuário saiu com sucesso!"
        ]);
    }
    
    public function forgotPassword () {}
    public function  resetPassword () {}
    public function data (Request $request) {}
}
