<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->foreign("reservation_id")->references("reservation_id")->on("reservations");
        });
        Schema::table('reservations', function (Blueprint $table) {
            $table->foreign("user_id")->references("user_id")->on("users");
            $table->foreign("book_id")->references("book_id")->on("books");
        });
        Schema::table('books', function (Blueprint $table) {
            $table->foreign("category_id")->references("category_id")->on("categories");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
