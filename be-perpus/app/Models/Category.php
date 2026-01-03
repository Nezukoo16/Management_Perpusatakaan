<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use SoftDeletes;
    protected $table = "categories";

    protected $primaryKey = 'category_id';

    protected $fillable = ["name"];
    public $timestamps = false;

    public function books(): HasMany
    {
        return $this->hasMany(Book::class);
    }

}
