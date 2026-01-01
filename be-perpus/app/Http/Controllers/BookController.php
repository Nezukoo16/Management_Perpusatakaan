<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class BookController extends Controller
{
    public function getBooks()
    {
        $books = Book::get();
        return ApiResponse::success($books, "Success To Get All Books");
    }

    public function getBook(Request $request, $id)
    {
        $book = Book::where("book_id", $id)->first();
        return ApiResponse::success($book, "Success To Get A Book");
    }

    public function createBook(Request $request)
    {
        $validated = $request->validate([
            "title" => "required|string",
            "category_id" => "required|integer",
            "author" => "required|string",
            "publisher" => "required|string",
            "publication_year" => "required|string",
            "stock" => "required|integer",
        ]);
        Log::info($validated);
        $book = Book::create($validated);
        return ApiResponse::success($book, "Succes to Create A Book");
    }

    public function updateBook(Request $request, $id)
    {
        $validated = $request->validate([
            "title" => "sometimes|string",
            "category_id" => "sometimes|integer",
            "author" => "sometimes|string",
            "publisher" => "sometimes|string",
            "publication_year" => "sometimes|string",
            "stock" => "sometimes|integer",
        ]);
        $book = Book::where("book_id", $id)->update($validated);
        return ApiResponse::success($book, "Succes to Create A Book");
    }

    public function deleteBook(Request $request, $id)
    {
        Book::where("book_id", $id)->delete();
        return ApiResponse::success(null, "Succes to Delete A Book");
    }
}
