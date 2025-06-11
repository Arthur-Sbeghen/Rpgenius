<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller {
    
    //recebe via API (nome, email, senha, conf_senha)
    public function register(Request $request) {
        $messages = [
            'login.required' => 'O nome de usuário é obrigatório.',
            'login.string' => 'O login deve conter apenas texto.',
            'login.unique' => 'Este login já está cadastrado.',
            'email.required' => 'O e-mail é obrigatório.',
            'email.email' => 'Digite um e-mail válido (ex: usuario@exemplo.com).',
            'email.unique' => 'Este e-mail já está cadastrado.',
            'password.required' => 'A senha é obrigatória.',
            'password.confirmed' => 'A confirmação de senha não corresponde.',
        ];

        $data = $request->validate([
            "login" => "required|string|unique:users,login",
            "email" => "required|email|unique:users,email",
            "password" => "required|confirmed",
            "password_confirmation" => "required"
        ], $messages);

        User::create($data);

        return response()->json([
            "status" => true,
            "message" => "Usuário criado com sucesso!"
        ]);
    }

    //recebe via API (email, senha)
    public function login(Request $request) {
    // Validação com mensagens personalizadas
        $request->validate([
            "email" => "required|email",
            "password" => "required"
        ], [
            'email.required' => 'O e-mail é obrigatório.',
            'email.email' => 'Digite um e-mail válido.',
            'password.required' => 'A senha é obrigatória.',
        ]);

        if (!Auth::attempt($request->only("email", "password"))) {
            return response()->json([
                "status" => false,
                "message" => "Credenciais inválidas",
            ], 401);
        }

        $user = Auth::user();

        $token = $user->createToken('myToken', ['*'], now()->addDay())->plainTextToken;

        return response()->json([
            "status" => true,
            "message" => "Login realizado!",
            "token" => $token,
            "user" => [
                "id" => $user->id,
                "name" => $user->name,
                "email" => $user->email
            ]
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
