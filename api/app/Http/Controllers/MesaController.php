<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MesaController extends Controller {

    public $data = [
        ['id' => 1, "nome" => "Mesa 1", "desc" => "Uma descrição exata e detalhada sobre a mesa não existe aqui.", "sys" => "D&D"],
        ['id' => 2, "nome" => "Mesa 2", "desc" => "Sendo sincero, essa mesa não deveria existir ou aparecer.", "sys" => "Ordem"],
    ];

    public function index () {
        return response()->json($this->data);
    }

    public function show ($id) {
        foreach($this->data as $table) {
            if ($table['id'] == $id) {
                return response()->json($table);
            }
        }
        return response()->json(['message'=>'Table not found'], 404);
    }

    // public function add (Request $request) {
    //     $newData = [
    //         'id' => count($this->data) + 1,
    //         "nome" => $request->input('nome'),
    //         "desc" => $request->input('desc'),
    //         "sys" => $request->input('sys'),
    //     ];
    // }
}