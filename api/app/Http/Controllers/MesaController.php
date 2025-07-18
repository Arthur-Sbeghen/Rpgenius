<?php

namespace App\Http\Controllers;

use App\Models\Table;
use App\Models\Player;
use App\Models\System;
use App\Models\User;
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
            $system = System::find($mesa->idSystem);
            return [
                'id' => $mesa->id,
                'isMaster' => $mesa->idMaster === auth()->id(),
                'name' => $mesa->name,
                'player_limit' => $mesa->player_limit,
                'num_players' => Player::where('idTable', $mesa->id)->count(),
                'players' => User::whereIn('id', Player::where('idTable', $mesa->id)->pluck('idUser'))->get(['login', 'id']),
                'system' => $system->name,
                'system_variables' => $system->variables,
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
    public function update (Request $request, $id) {
        $request->validate([
            'name' => 'required|string|max:50',
            'player_limit' => 'required|integer|min:1|max:10',
        ]);

        $mesa = Table::find($id);

        if (!$mesa) {
            return response()->json(['message' => 'Mesa não encontrada'], 404);
        }

        if ($mesa->idMaster !== auth()->id() && !Player::where('idTable', $mesa->id)->where('idUser', auth()->id())->exists()) {
            return response()->json(['message' => 'Você não é o mestre desta mesa. Você não tem permissão para editá-la.'], 403);
        }

        if ($mesa->player_limit > $request->player_limit) {
            $currentPlayers = Player::where('idTable', $mesa->id)->count();
            if ($currentPlayers > $request->player_limit) {
                return response()->json(['message' => 'Número de jogadores excede o novo limite. Não é possível inserir um limite inferior ao número atual de jogadores.'], 400);
            }
        }

        $mesa->name = $request->name;
        $mesa->player_limit = $request->player_limit;

        if (!$mesa->save()) {
            return response()->json(['message' => 'Erro ao atualizar mesa.'], 500);
        }

        return response()->json(['message' => 'Mesa atualizada com sucesso!'], 200);
    }
    public function destroy ($id) {
        $mesa = Table::find($id);

        if (!$mesa) {
            return response()->json(['message' => 'Mesa não encontrada'], 404);
        }

        if ($mesa->idMaster !== auth()->id()) {
            return response()->json(['message' => 'Você não é o mestre desta mesa. Você não tem permissão para excluí-la.'], 403);
        }

        $mesa->delete();

        return response()->json(['message' => 'Mesa excluída com sucesso!'], 200);
    }

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

    public function removePlayer($id, $playerId) {
        $mesa = Table::find($id);

        if (!$mesa) {
            return response()->json(['message' => 'Mesa não encontrada'], 404);
        }

        if ($mesa->idMaster !== auth()->id()) {
            return response()->json(['message' => 'Você não é o mestre desta mesa. Você não tem permissão para remover jogadores.'], 403);
        }

        $player = Player::where('idTable', $mesa->id)->where('idUser', $playerId)->first();

        if (!$player) {
            return response()->json(['message' => 'Jogador não encontrado na mesa'], 404);
        }

        $player->delete();

        return response()->json(['message' => 'Jogador removido com sucesso!'], 200);
    }

    public function leave ($id) {
        $mesa = Table::find($id);
        
        if (!$mesa) {
            return response()->json(['message' => 'Mesa não encontrada'], 404);
        }

        $player = Player::where('idTable', $mesa->id)->where('idUser', auth()->id())->first();

        if (!$player) {
            return response()->json(['message' => 'Você não está na mesa'], 404);
        }

        $mestre = Table::where('idMaster', auth()->id())
            ->where('id', $mesa->id)
            ->exists();
        
        if ($mestre) {
            return response()->json(['message' => 'Você é o mestre desta mesa. Você não pode sair dela.'], 403);
        }

        $player->delete();

        return response()->json(['message' => 'Você saiu da mesa com sucesso!'], 200);
    }
}