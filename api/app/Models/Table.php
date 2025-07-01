<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Table extends Model {
    protected $fillable = [
        'name',
        'player_limit',
        'idSystem',
        'invite_code',
        'idMaster'
    ];

    public static function generateInviteCode(int $length = 8): string {
        $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        $code = '';
    
        do {
            for ($i = 0; $i < $length; $i++) {
                $code .= $characters[rand(0, strlen($characters) - 1)];
            }
        } while (Table::where('invite_code', $code)->exists());

        return $code;
    }
}