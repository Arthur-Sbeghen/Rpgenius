<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    
    public $timestamps = false;
    protected $fillable = [
        'idUser',
        'idTable',
        'isMaster',
    ];
}
