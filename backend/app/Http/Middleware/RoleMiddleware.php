<?php

namespace App\Http\Middleware;

use App\DTOs\ApiResponse;
use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, string ...$roles)
    {
        if (!$request->user()) {
            return ApiResponse::error('Unauthenticated.', 401);
        }

        if (!in_array($request->user()->role, $roles)) {
            return ApiResponse::error('Forbidden. Insufficient permissions.', 403);
        }

        return $next($request);
    }
}
