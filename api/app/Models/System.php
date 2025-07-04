<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class System extends Model
{
    protected $fillable = [
        'name',
        'variables',
        'description'
    ];

    protected $casts = [
    'variables' => 'array',
];
}
