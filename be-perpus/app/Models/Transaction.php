<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transaction extends Model
{
    use SoftDeletes;
    protected $table = "transactions";
    protected $primaryKey = 'transaction_id';

    protected $fillable = ["reservation_id", "borrow_date", "due_date", "return_date", "status"];
    public function reservation(): BelongsTo
    {
        return $this->belongsTo(Reservation::class);
    }

}
