<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Transaction extends Model
{
    protected $table = "transactions";
    protected $primaryKey = 'transaction_id';

    protected $fillable = ["user_id", "book_id", "borrow_date", "due_date", "return_date", "status", "fine"];
    public function user(): HasOne
    {
        return $this->hasOne(User::class);
    }
    public function book(): HasOne
    {
        return $this->hasOne(Book::class);
    }
}
