<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Transaction;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TransactionController extends Controller
{

    public function getTransactions()
    {
        $transactions = Transaction::get();
        return ApiResponse::success($transactions, "Success To Get All Transactions");
    }

    public function getTransaction(Request $request, $id)
    {
        $transaction = Transaction::where("transaction_id", $id)->first();
        return ApiResponse::success($transaction, "Success To Get A Transaction");
    }

    public function createTransaction(Request $request)
    {
        try {
            $validated = $request->validate([
                "reservation_id" => "required|integer",
                "borrow_date" => "required|string",
                "due_date" => "required|string",
                "status" => "sometimes|string",
            ]);
            $transaction = Transaction::create($validated);
            return ApiResponse::success($transaction, "Succes to Create A Transaction");
        } catch (Exception $e) {
            Log::alert($e);
            return ApiResponse::error("Internal Server Error", $e, 500);
        }
    }

    public function updateTransaction(Request $request, $id)
    {
        $validated = $request->validate([
            "reservation_id" => "sometimes|integer",
            "borrow_date" => "sometimes|string",
            "due_date" => "sometimes|string",
            "return_date" => "sometimes|string",
            "status" => "sometimes|string",
        ]);
        $transaction = Transaction::where("transaction_id", $id)->update($validated);
        return ApiResponse::success($transaction, "Succes to Update A Transaction");
    }

    public function deleteTransaction(Request $request, $id)
    {
        Transaction::where("transaction_id", $id)->delete();
        return ApiResponse::success(null, "Succes to Delete A Transaction");
    }
}
