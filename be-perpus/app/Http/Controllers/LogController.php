<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Log;

class LogController extends Controller
{
    public function getLogs()
    {
        return ApiResponse::success(Log::with("user")->get());
    }
}
