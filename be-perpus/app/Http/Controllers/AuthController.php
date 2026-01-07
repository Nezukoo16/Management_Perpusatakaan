<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function login(Request $request)
    {

        try {
            $validated = $request->validate([
                'email' => "required|string",
                "password" => 'required|string'
            ], );
            if (!Auth::attempt($validated)) {
                return ApiResponse::error("Failed to login");
            }

            if (!$token = JWTAuth::attempt($validated)) {
                return ApiResponse::error("Failed to login");
            }

            return ApiResponse::success(["token" => $token], "Success to login");
        } catch (Exception $e) {

            return ApiResponse::error("Internal Server Error", $e);
        }
    }

    public function me()
    {
        $user = Auth::user();
        return ApiResponse::success($user);
    }

    public function register(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => "required|string",
                'email' => "required|email",
                "password" => 'required|string',
                'nim' => 'required|integer',
                'jurusan' => 'required|string',
                'status' => 'sometimes|boolean'
            ], );
            $validated["password"] = Hash::make($validated["password"]);
            $user = User::create($validated);
            return ApiResponse::success($user, "Success to register");
        } catch (Exception $e) {
            return ApiResponse::error("Internal Server Error", $e);
        }
    }
    public function update(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'name' => "sometimes|string",
                'email' => "sometimes|email",
                "password" => 'sometimes|string',
                'nim' => 'sometimes|integer',
                'jurusan' => 'sometimes|string',
                'status' => 'sometimes|boolean'
            ], );
            if ($validated["password"] != null) {
                $validated["password"] = Hash::make($validated["password"]);
            }
            $user = User::where("user_id", $id)->update($validated);
            return ApiResponse::success($user, "Success to update");
        } catch (Exception $e) {
            return ApiResponse::error("Internal Server Error", $e);
        }
    }
    public function refresh()
    {
        try {
            $token = JWTAuth::parseToken()->refresh();
            return ApiResponse::success(["token" => $token], "Success to login");
        } catch (\Throwable $e) {
            Log::alert($e);
            return ApiResponse::error("Internal Server Error", $e);
        }
    }
    public function logout()
    {
        try {
            Auth::logout();
            return ApiResponse::success(null, "Success to logout");
        } catch (Exception $e) {
            return ApiResponse::error("Internal Server Error", $e);
        }
    }
}
