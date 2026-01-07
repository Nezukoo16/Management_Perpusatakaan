<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Book extends Model
{
    use SoftDeletes;
    protected $table = "books";
    protected $primaryKey = 'book_id';
    protected $fillable = ["title", "author", "publisher", "publication_year", "stock", "category_id"];
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
    public function reservations(): HasMany
    {
        return $this->hasMany(Category::class);
    }

}
