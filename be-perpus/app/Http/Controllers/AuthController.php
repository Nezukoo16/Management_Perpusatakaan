<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function login(Request $request)
    {

        try {
            $validated = $request->validate([
                'username' => "required|string",
                "password" => 'required|string'
            ], );
            if (!Auth::attempt($validated)) {
                return response()->json([], 401);
            }

            if (!$token = JWTAuth::attempt($validated)) {
                return response()->json([], 401);
            }
            return ApiResponse::success(["token" => $token], "Success to login");
        } catch (Exception $e) {
            return ApiResponse::error("Internal Server Error");
        }
    }

    public function register(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => "required|string",
                "password" => 'required|string',
                'nim' => 'required|integer',
                'jurusan' => 'required|string'
            ], );
            $validated["password"] = Hash::make($validated["password"]);
            $user = User::create($validated);
            return ApiResponse::success($user, "Success to register");
        } catch (Exception $e) {
            return ApiResponse::error("Internal Server Error");
        }
    }
    public function update(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'name' => "sometimes|string",
                "password" => 'sometimes|string',
                'nim' => 'sometimes|integer',
                'jurusan' => 'sometimes|string'
            ], );
            if ($validated["password"] != null) {
                $validated["password"] = Hash::make($validated["password"]);
            }
            $user = User::where("user_id", $id)->update($validated);
            return ApiResponse::success($user, "Success to update");
        } catch (Exception $e) {
            return ApiResponse::error("Internal Server Error");
        }
    }
    public function refresh()
    {
        try {
            $token = JWTAuth::refresh();
            return ApiResponse::success(["token" => $token], "Success to login");
        } catch (\Throwable $e) {
            return ApiResponse::error("Internal Server Error");
        }
    }
    public function logout()
    {
        try {
            Auth::logout();
            return ApiResponse::success(null, "Success to logout");
        } catch (Exception $e) {
            return ApiResponse::error("Internal Server Error");
        }
    }
}
