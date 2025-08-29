<?php

namespace Database\Seeders;

use App\Models\Table;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\System;

class TableSeeder extends Seeder
{
    public function run(): void
    {
        

    $user = User::firstOrFail();
    $system = System::firstOrCreate(
        ['name' => 'Som'],
        [
            'variables' => '...',
            'description' => 'Sistema de RPG de faroeste'
        ]
    );

    Table::firstOrCreate(
        ['name' => 'Som das Seis'],
        [
            'idMaster' => $user->id,
            'image' => '',
            'idSystem' => $system->id
        ]
    );

    }
}