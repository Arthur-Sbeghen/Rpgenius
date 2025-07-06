<?php

namespace App\Http\Controllers;

use App\Models\Table;
use App\Models\Player;
use App\Models\System;
use Auth;
use Illuminate\Http\Request;

class MesaController extends Controller {

    public function index () {
        $jogador = Player::where('idUser', auth()->id())->get();
        $mestre = Table::where('idMaster', auth()->id())->get();
        
        if ($jogador->isEmpty() && $mestre->isEmpty()) {
            return response()->json(['message' => 'Você não está em nenhuma mesa!', 'action' => true], 404);
        }

        $idsPlayer = $jogador->pluck('idTable')->toArray();
        $idsMaster = $mestre->pluck('id')->toArray();

        $ids = array_unique(array_merge($idsPlayer, $idsMaster));
        
        $mesas = Table::whereIn('id', $ids)->get();

        if ($mesas->isEmpty()) {
            return response()->json(['message' => 'Nenhuma mesa encontrada'], 404);
        }

        $mesas = $mesas->map(function ($mesa) {
            return [
                'id' => $mesa->id,
                'isMaster' => $mesa->idMaster === auth()->id(),
                'name' => $mesa->name,
                'players' => Player::where('idTable', $mesa->id)->count(),
                'system' => System::find($mesa->idSystem)->name,
                'dice' => [6, 20, 100],
                'invite_code' => $mesa->invite_code
            ];
        });

        return response()->json($mesas, 200);
    }

    public function show ($id) {
        if (!is_numeric($id)) {
            return response()->json(['message' => 'ID inválido'], 400);
        }

        $mesa = Table::find($id);

        if (!$mesa) {
            return response()->json(['message' => 'Mesa não encontrada'], 404);
        }

        return response()->json([$mesa, "mestre" => $mesa->idMaster !== auth()->id()], 200);
    }

    public function systems () {
        // System::create([
        //     'name' => 'D&D',
        //     'variables' => json_encode(["a"]),
        //     'description' => 'Extremamente popular, perfeito para aventuras fantásticas!',
        // ]);
        // System::create([
        //     'name' => 'Ordem Paranormal',
        //     'variables' => json_encode(["a"]),
        //     'description' => 'Do Brasil, explora o oculto e o sobrenatural.',
        // ]);
        // System::create([
        //     'name' => 'Som das Seis',
        //     'variables' => json_encode(["a"]),
        //     'description' => 'Um sistema de RPG de mesa brasileiro que mistura fantasia e ficção científica.',
        // ]);
        // System::create([
        //     'name' => 'Call of Cthulhu',
        //     'variables' => json_encode(["a"]),
        //     'description' => 'Um clássico do terror cósmico, onde os jogadores enfrentam horrores inimagináveis.',
        // ]);

        $systems = System::all()->map(function ($system) {
            return [
                'id' => $system->id,
                'name' => $system->name
            ];  
        });
        return response()->json($systems, 200);
    }

    public function store (Request $request) {
        $request->validate([
            'name' => 'required|string|max:50',
            'player_limit' => 'required|integer|min:1|max:10',
            'idSystem' => 'required|exists:systems,id',
        ]);

        $user = auth()->user();

        if (!$user) {
            return response()->json(['message' => 'Usuário não autenticado'], 401);
        }

        $mesa = Table::create([
            'name' => $request->name,
            'player_limit' => $request->player_limit,
            'idSystem' => $request->idSystem,
            'invite_code' => Table::generateInviteCode(),
            'idMaster' => $user->id
        ]);

        if(!$mesa) {
            return response()->json(['message' => 'Erro ao criar mesa'], 500);
        }

        return response()->json(['message' => 'Mesa criada com sucesso!'], 201);
    }
    public function update (Request $request, $id) {}
    public function destroy ($id) {}

    public function enter (Request $request) {
        $validated = $request->validate([
            'invite_code' => 'required|string|size:8',
        ]);

        $mesa = Table::where('invite_code', $validated['invite_code'])->first();

        if (!$mesa) {
            return response()->json(['message' => 'Código de convite inválido'], 404);
        }

        $isPlayer = Player::where('idUser', auth()->id())
            ->where('idTable', $mesa->id)
            ->exists();

        if ($isPlayer) {
            return response()->json(['message' => 'Você já está na mesa'], 400);
        }

        $isMaster = Table::where('idMaster', auth()->id())
            ->where('id', $mesa->id)
            ->exists();
        
        if ($isMaster) {
            return response()->json(['message' => 'Você já é o mestre desta mesa'], 400);
        }

        Player::create([
            'idUser' => auth()->id(),
            'idTable' => $mesa->id,
            'isMaster' => false
        ]);

        return response()->json(['message' => 'Você entrou na mesa com sucesso!'], 200);
    }
}