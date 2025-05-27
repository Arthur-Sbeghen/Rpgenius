<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MesaController extends Controller {

    public $data = [
        [
            "id" => 1,
            "table" => "Mesa do Eloi",
            "attributes" => [
                "Vida" => "100",
                "Atletismo" => "75",
                "Força" => "90",
                "Intelecto" => "80",
                "Sanidade" => "60"
            ],
            "players" => [
                [
                    "id" => 1,
                    "name" => "Hélio",
                    "attributes" => [90, 70, 85, 60, 50]
                ],
                [
                    "id" => 2,
                    "name" => "Céi",
                    "attributes" => [80, 65, 75, 70, 55]
                ]
            ],
            "dice" => [6, 6, 20],
            "system" => "D&D"
        ]
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