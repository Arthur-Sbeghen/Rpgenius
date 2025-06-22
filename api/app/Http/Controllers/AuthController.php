<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;

class AuthController extends Controller {
    
    //recebe via API (nome, email, senha, conf_senha)
    public function register(Request $request) {
        $messages = [
            'login.required' => 'O nome de usuário é obrigatório.',
            'login.string' => 'O login deve conter apenas texto.',
            'login.unique' => 'Este login já está cadastrado.',
            'login.max' => 'O login deve ter no máximo 40 dígitos.',
            'email.required' => 'O e-mail é obrigatório.',
            'email.email' => 'Digite um e-mail válido (ex: usuario@exemplo.com).',
            'email.unique' => 'Este e-mail já está cadastrado.',
            'password.required' => 'A senha é obrigatória.',
            'password.min' => 'A senah deve ter no mínimo 6 dígitos.',
            'password.confirmed' => 'A confirmação de senha não corresponde.',
        ];

        $data = $request->validate([
            "login" => "required|string|unique:users,login|max:40",
            "email" => "required|email:rfc,dns|unique:users,email",
            "password" => "required|confirmed|min:6",
            "password_confirmation" => "required"
        ], $messages);

        $user = User::create([
            'login' => $data['login'],
            'email' => $data['email'],
            'isAdmin' => false,
            'password' => Hash::make($data['password'])
        ]);

        $token = $user->createToken('apiToken', ['post:read', 'post:create'])->plainTextToken;

        return response()->json([
            "status" => true,
            "token" => $token,
            "message" => "Usuário criado com sucesso!"
        ]);
    }

    //recebe via API (email, senha)
    public function login(Request $request) {
        $data = $request->validate([
            "email" => "required|email:rfc,dns",
            "password" => "required"
        ], [
            'email.required' => 'O e-mail é obrigatório.',
            'email.email' => 'Digite um e-mail válido.',
            'password.required' => 'A senha é obrigatória.',
        ]);

        if (!Auth::attempt($data)) {
            return response()->json([
                "status" => false,
                "message" => "Credenciais inválidas",
            ], 401);
        }

        $user = User::where('email', $data['email'])->first();
        $token = $user->createToken('apiToken', /*['*']*/['post:read', 'post:create'])->plainTextToken;

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
        $token = $request->bearerToken();

        if (!$token) {
             return response()->json([
                "token" => $token,
                "status" => false,
                "message" => "Credenciais não foram passadas corretamente",
            ], 400);
        }

        $access_token = PersonalAccessToken::findToken($token);

        if (!$access_token) {
             return response()->json([
                "status" => false,
                "message" => "Credenciais não foram passadas corretamente",
            ], 400);
        }

        $access_token->delete();

        Auth::logout();

        return response()->json([
            "status" => true,
            "message" => "Usuário saiu com sucesso!"
        ]);
    }
    
    public function forgotPassword (Request $request) {
        $data = $request->validate([
            "email" => "required|email:rfc,dns"
        ], [
            'email.required' => 'O e-mail é obrigatório.',
            'email.email' => 'Digite um e-mail válido.',
        ]);

        $user = User::where('email', $data['email'])->first();
        if (!$user) {
            return response()->json([
                "status" => false,
                "message" => "E-mail não encontrado."
            ], 404);
        }

        //mandar e-mail;

        return response()->json([
            "status" => true,
            "message" => "Instruções para recuperação de senha enviadas para o e-mail."
        ]);

    }
    public function  resetPassword () {}
    public function data (Request $request) {}
}
