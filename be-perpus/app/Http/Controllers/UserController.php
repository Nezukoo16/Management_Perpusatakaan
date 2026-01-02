<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function getUsers()
    {
        $users = User::get();
        return ApiResponse::success($users, "Success To Get All Users");
    }

    public function getUser(Request $request, $id)
    {
        $user = User::where("user_id", $id)->first();
        return ApiResponse::success($user, "Success To Get A User");
    }

    public function createUser(Request $request)
    {
        $validated = $request->validate([
            "email" => "required|string",
            "name" => "required|string",
            "nim" => "required|integer",
            "jurusan" => "required|string",
            "role" => "required|string",
            "status" => "required|boolean",
            "password" => "required|string",
        ]);
        $validated["password"] = Hash::make($validated["password"]);
        $user = User::create($validated);
        return ApiResponse::success($user, "Succes to Create A User");
    }

    public function updateUser(Request $request, $id)
    {
        $validated = $request->validate([
            "email" => "sometimes|string",
            "name" => "sometimes|string",
            "nim" => "sometimes|integer",
            "jurusan" => "sometimes|string",
            "role" => "sometimes|string",
            "status" => "sometimes|boolean",
            "password" => "sometimes|string",
        ]);
        if ($validated["password"] != null) {
            $validated["password"] = Hash::make($validated["password"]);
        }
        $user = User::where("user_id", $id)->update($validated);
        return ApiResponse::success($user, "Succes to Create A User");
    }

    public function deleteUser(Request $request, $id)
    {
        User::where("user_id", $id)->delete();
        return ApiResponse::success(null, "Succes to Delete A User");
    }
}
