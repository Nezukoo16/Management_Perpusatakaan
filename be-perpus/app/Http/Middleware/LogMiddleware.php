<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Log;
use Illuminate\Support\Facades\Auth;

class LogMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Jalankan request terlebih dahulu
        $response = $next($request);

        try {
            Log::create([
                'user_id' => Auth::check() ? Auth::id() : null,
                'log_method' => $request->method(),
                'log_url' => $request->fullUrl(),
                'log_ip' => $request->ip(),
                'log_request' => $request,

            ]);
        } catch (\Throwable $e) {
            // Jangan sampai logging membuat request gagal
            report($e);
        }

        return $response;
    }




}
