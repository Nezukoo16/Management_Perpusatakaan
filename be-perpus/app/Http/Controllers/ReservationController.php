<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Reservation;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Transliterator;

class ReservationController extends Controller
{
    public function getReservations()
    {
        $reservations = Reservation::get();
        return ApiResponse::success($reservations, "Success To Get All Reservations");
    }

    public function getReservation(Request $request, $id)
    {
        $reservation = Reservation::where("reservation_id", $id)->first();
        return ApiResponse::success($reservation, "Success To Get A Reservation");
    }

    public function createReservation(Request $request)
    {
        $validated = $request->validate([
            "user_id" => "required|integer",
            "book_id" => "required|integer",
            "reservation_date" => "required|string",
            "status" => "required|string",
        ]);
        $reservation = Reservation::create($validated);
        return ApiResponse::success($reservation, "Succes to Create A Reservation");
    }

    public function updateReservation(Request $request, $id)
    {
        $validated = $request->validate([
            "user_id" => "required|integer",
            "book_id" => "sometimes|integer",
            "reservation_date" => "sometimes|string",
            "status" => "sometimes|string",
        ]);

        // $transaction = Transaction::whereHas("reservation", function ($query) use ($validated) {
        //     $query->where("user_id", $validated["user_id"])->where("status", "borrowed")->firstOrFail();
        // });
        // if ($transaction) {
        //     return ApiResponse::error("You must return the book that you borrowed");
        // }
        $reservation = Reservation::where("reservation_id", $id)->update($validated);
        return ApiResponse::success($reservation, "Succes to Update A Reservation");
    }

    public function deleteReservation(Request $request, $id)
    {
        Reservation::where("reservation_id", $id)->delete();
        return ApiResponse::success(null, "Succes to Delete A Reservation");
    }
}
