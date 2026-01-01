<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Reservation extends Model
{
    protected $table = "reservations";
    protected $primaryKey = 'reservation_id';

    protected $fillable = ["user_id", "book_id", "reservation_date", "status"];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }
    public function transaction(): HasOne
    {
        return $this->hasOne(Transaction::class);
    }
}
