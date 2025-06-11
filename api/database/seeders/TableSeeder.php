<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (DB::table('users')->count() == 0) {
            $this->call(DatabaseSeeder::class);
        }

        if (DB::table('systems')->count() == 0) {
            $this->call(SystemSeeder::class);
        }

        $userIds = DB::table('users')->pluck('id')->toArray();
        $systemIds = DB::table('systems')->pluck('id')->toArray();

        $tables = [
            [
                'name' => 'Som das Seis',
                'idMaster' => $userIds[0] ?? 1,
                'image' => '',
                'idSystem' => $systemIds[0] ?? null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('tables')->insert($tables);
    }
}