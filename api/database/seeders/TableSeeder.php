<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TableSeeder extends Seeder
{
    public function run(): void
    {
        

    $user = \App\Models\User::firstOrFail();
    $system = \App\Models\System::firstOrCreate(
        ['name' => 'Som'],
        [
            'variables' => '...',
            'description' => 'Sistema de RPG de faroeste'
        ]
    );

    \App\Models\Mesa::firstOrCreate(
        ['name' => 'Som das Seis'],
        [
            'idMaster' => $user->id,
            'image' => '',
            'idSystem' => $system->id
        ]
    );

    }
}