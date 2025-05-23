<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Produto;

class ProdutoSeeder extends Seeder
{
    public function run()
    {
        Produto::insert([
            [
                'nome' => 'Teclado Mecânico RGB',
                'preco' => 289.90,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nome' => 'Mouse Gamer 3200 DPI',
                'preco' => 159.99,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nome' => 'Monitor 24" Full HD',
                'preco' => 749.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nome' => 'Headset com Microfone',
                'preco' => 199.50,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nome' => 'Cadeira Gamer Reclinável',
                'preco' => 1349.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
