<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Authentication
Route::prefix("/auth")->group(function () {
    Route::post("/login", [AuthController::class, "login"]);
    Route::post("/register", [AuthController::class, "register"]);
    Route::get("/refresh", [AuthController::class, "refresh"]);
});

Route::middleware("jwt.auth")->group(function () {
    // Authentication
    Route::delete("/auth/logout", [AuthController::class, "logout"]);
    Route::get("/auth/me", [AuthController::class, "me"]);


    // Users
    Route::get("/users", [UserController::class, "getUsers"]);
    Route::get("/users/{id}", [UserController::class, "getUser"]);
    Route::post("/users", [UserController::class, "createUser"]);
    Route::patch("/users/{id}", [UserController::class, "updateUser"]);
    Route::delete("/users/{id}", [UserController::class, "deleteUser"]);

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

    // Reservations
    Route::get("/reservations", [ReservationController::class, "getReservations"]);
    Route::get("/reservations/{id}", [ReservationController::class, "getReservation"]);
    Route::post("/reservations", [ReservationController::class, "createReservation"]);
    Route::patch("/reservations/{id}", [ReservationController::class, "updateReservation"]);
    Route::delete("/reservations/{id}", [ReservationController::class, "deleteReservation"]);

    // Transactions
    Route::get("/transactions", [TransactionController::class, "getTransactions"]);
    Route::get("/transactions/{id}", [TransactionController::class, "getTransaction"]);
    Route::post("/transactions", [TransactionController::class, "createTransaction"]);
    Route::patch("/transactions/{id}", [TransactionController::class, "updateTransaction"]);
    Route::delete("/transactions/{id}", [TransactionController::class, "deleteTransaction"]);

});

