<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Reservation extends Model
{
    use SoftDeletes;
    protected $table = "reservations";
    protected $primaryKey = 'reservation_id';

    protected $fillable = ["user_id", "book_id", "reservation_date", "status"];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, "user_id", "user_id");
    }
    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class, "book_id", "book_id");
    }
    public function transaction(): HasOne
    {
        return $this->hasOne(Transaction::class, "reservation_id", "reservation_id");
    }
}
