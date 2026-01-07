<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Reservation;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ReservationController extends Controller
{
    public function getReservations()
    {
        $user = Auth::user();
        if ($user["role"] == "admin") {
            $reservations = Reservation::with(["user", "book"])->orderBy("status")->get();
            return ApiResponse::success($reservations, "Success To Get All Reservations");
        } else {
            $reservations = Reservation::where("user_id", $user["user_id"])->with(["user", "book"])->orderBy("status")->get();
            return ApiResponse::success($reservations, "Success To Get All Reservations");
        }

    }

    public function getReservation(Request $request, $id)
    {
        $reservation = Reservation::where("reservation_id", $id)->first();
        return ApiResponse::success($reservation, "Success To Get A Reservation");
    }

    public function createReservation(Request $request)
    {



        $validated = $request->validate([
            "book_id" => "required|integer",
            "user_id" => "nullable",
            "reservation_date" => "nullable",

        ]);

        if (!$validated["user_id"]) {
            $validated["user_id"] = Auth::user()["user_id"];
        }

        if (!$validated["reservation_date"]) {
            $validated["reservation_date"] = Carbon::now();
        }





        $current = Reservation::where("user_id", $validated["user_id"])->where("status", "waiting")->first();

        if ($current)
            return ApiResponse::error("You'va made a reservation");

        $validated["status"] = "waiting";

        $reservation = Reservation::create($validated);
        return ApiResponse::success($reservation, "Succes to Create A Reservation");
    }



    public function deleteReservation(Request $request, $id)
    {
        Reservation::where("reservation_id", $id)->delete();
        return ApiResponse::success(null, "Succes to Delete A Reservation");
    }

    public function updateReservation(Request $request, $id)
    {
        $validated = $request->validate([
            "user_id" => "required|integer",
            "book_id" => "sometimes|integer",
            "reservation_date" => "sometimes|string",
            "status" => "sometimes|in:waiting,cancelled,completed",
        ]);

        $reservation = Reservation::where("reservation_id", $id)->first();

        if ($reservation["status"] != "waiting") {
            return ApiResponse::error("You cant change reservation");
        }

        if ($validated["status"] == "cancelled") {
            $reservation->update($validated);
            return ApiResponse::success($reservation, message: "Succes to cancel the reservation");
        }

        $reservation->update($validated);


        Transaction::create([
            "reservation_id" => $reservation["reservation_id"],
            "borrow_date" => Carbon::now(),
            "due_date" => Carbon::now()->addWeek(),
            "status" => "borrowed",
        ]);

        return ApiResponse::success($reservation, message: "Succes to approve the reservation");

    }

}
