<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MesaController extends Controller {

    public $data = [
        [
            "id" => 1,
            "table" => "Mesa do Eloi",
            "attributes" => "Vida", // exemplo, poderia ser qualquer um dos AttributeName
            "players" => [
                [ 
                    "id" => 1,
                    "name" => "Hélio",
                    "attributes" => [
                        ["name" => "Vida", "value" => 90],
                        ["name" => "Atletismo", "value" => 70],
                        ["name" => "Força", "value" => 85],
                        ["name" => "Intelecto", "value" => 60],
                        ["name" => "Sanidade", "value" => 50],
                    ]
                ],
                [
                    "id" => 2,
                    "name" => "Céi",
                    "attributes" => [
                        ["name" => "Vida", "value" => 60],
                        ["name" => "Atletismo", "value" => 50],
                        ["name" => "Força", "value" => 35],
                        ["name" => "Intelecto", "value" => 50],
                        ["name" => "Sanidade", "value" => 45],
                    ]
                ]
            ],
            "dice" => [6, 6, 20],
            "system" => "D&D"
        ],
        [
            "id" => 2,
            "table" => "Mesa do IFRS",
            "attributes" => "Vida",
            "players" => [
                [ 
                    "id" => 1,
                    "name" => "Ivan Prá",
                    "attributes" => [
                        ["name" => "Vida", "value" => 90],
                        ["name" => "Atletismo", "value" => 20],
                        ["name" => "Força", "value" => 80],
                        ["name" => "Intelecto", "value" => 75],
                        ["name" => "Sanidade", "value" => 50],
                    ]
                ],
                [
                    "id" => 2,
                    "name" => "Jaques",
                    "attributes" => [
                        ["name" => "Vida", "value" => 75],
                        ["name" => "Atletismo", "value" => 80],
                        ["name" => "Força", "value" => 79],
                        ["name" => "Intelecto", "value" => 82],
                        ["name" => "Sanidade", "value" => 90],
                    ]
                ]
            ],
            "dice" => [6, 20, 100],
            "system" => "IF"
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

    public function store (Request $request) {}
    public function update (Request $request, $id) {}
    public function destroy ($id) {}
}