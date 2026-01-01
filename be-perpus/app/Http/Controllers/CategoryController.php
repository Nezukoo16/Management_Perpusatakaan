<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function getCategories()
    {
        $categories = Category::get();
        return ApiResponse::success($categories, "Success To Get All Categories");
    }

    public function getCategory(Request $request, $id)
    {
        $category = Category::where("category_id", $id)->first();
        return ApiResponse::success($category, "Success To Get A Category");
    }

    public function createCategory(Request $request)
    {
        $validated = $request->validate([
            "name" => "required|string",
        ]);
        $category = Category::create($validated);
        return ApiResponse::success($category, "Succes to Create A Category");
    }

    public function updateCategory(Request $request, $id)
    {
        $validated = $request->validate([
            "name" => "sometimes|string",
        ]);
        $category = Category::where("category_id", $id)->update($validated);
        return ApiResponse::success($category, "Succes to Create A Category");
    }

    public function deleteCategory(Request $request, $id)
    {
        Category::where("category_id", $id)->delete();
        return ApiResponse::success(null, "Succes to Delete A Category");
    }
}
