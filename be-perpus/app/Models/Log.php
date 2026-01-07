<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Log extends Model
{
    use HasFactory, SoftDeletes;

    // Nama tabel
    protected $table = 'logs';

    // Primary key custom
    protected $primaryKey = 'log_id';

    // Jika primary key bukan incrementing default
    public $incrementing = true;

    // Tipe primary key
    protected $keyType = 'int';

    // Kolom yang boleh diisi mass assignment
    protected $fillable = [
        'user_id',
        'log_method',
        'log_url',
        'log_ip',
        'log_request',

    ];

    // Casting tipe data
    protected $casts = [
        'user_id' => 'string',
        'log_request' => 'string',

        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    /**
     * Relasi ke User (opsional)
     * Jika user_id mengacu ke tabel users
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}
