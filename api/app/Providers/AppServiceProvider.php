<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Http\Request;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        RateLimiter::for('user', function (Request $request) {
            return Limit::perMinute(5)
                ->by($request->user()?->id ?: $request->ip())
                    ->response(function ($request, array $headers) {
                        $retryAfter = $headers["Retry-After"] ?? 60;
                        return response()->json([
                            'message' => "Você excedeu o limite de requisições. Por favor, tente novamente mais tarde.",
                            'retryAfter' => (int) $retryAfter
                        ], 429);
                });
        });

        RateLimiter::for('login', function (Request $request) {
            return [
                Limit::perMinute(10),
                Limit::perMinute(3)->by($request->ip() . '|' . $request->email)
                    ->response(function () {
                        return response()->json([
                            'message' => 'Limite de tentativas excedido. Tente novamente em 1 minuto.'
                        ], 429);
            })
            ];
        });

        RateLimiter::for('admin', function (Request $request) {
            if ($request->user()->isAdmin) {
                return Limit::none();
            } else {
                return Limit::perMinute(5)
                    ->by($request->user()?->id ?: $request->ip())
                        ->response(function ($request, array $headers) {
                            $retryAfter = $headers["Retry-After"] ?? 60;
                            return response()->json([
                                'message' => "Você excedeu o limite de requisições. Por favor, tente novamente mais tarde.",
                                'retryAfter' => (int) $retryAfter
                            ], 429);
                });
            }
        });
    }
}
