<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;

// Route::middleware(["auth.jwt"])->group(function () {
// Categories
Route::get("/categories", [CategoryController::class, "getCategories"]);
Route::get("/categories/{id}", [CategoryController::class, "getCategory"]);
Route::post("/categories", [CategoryController::class, "createCategory"]);
Route::patch("/categories/{id}", [CategoryController::class, "updateCategory"]);
Route::delete("/categories/{id}", [CategoryController::class, "deleteCategory"]);

// Books
Route::get("/books", [BookController::class, "getBooks"]);
Route::get("/books/{id}", [BookController::class, "getBook"]);
Route::post("/books", [BookController::class, "createBook"]);
Route::patch("/books/{id}", [BookController::class, "updateBook"]);
Route::delete("/books/{id}", [BookController::class, "deleteBook"]);

// });

