<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;
use Inertia\Response as InertiaResponse;
use Illuminate\Support\Facades\DB;

Route::get('/surnames/{name}', function (string $name): InertiaResponse {
    $name = DB::table('person')
        ->select([
            'last_name AS name',
            DB::raw('COUNT(last_name) as amount')
        ])
        ->groupBy('last_name')
        ->orderBy('amount', 'DESC')
        ->where('last_name', '=', $name)
        ->firstOrFail();

    return Inertia::render('surname', [
        'name' => $name
    ]);
})->name('surname');

Route::get('/surnames', function (): InertiaResponse {
    // **Пример массива (Array List)**
    $arr = [0, 1, 2, 3];

    // **Пример ассоциативного массива (Hashmap)**
    $arr2 = [
        'name' => 'John Doe',
        'age' => 30,
    ];

    $names = DB::table('person')
        ->select([
            'last_name AS name',
            DB::raw('COUNT(last_name) as amount')
        ])
        ->groupBy('last_name')
        ->orderBy('amount', 'DESC')
        ->limit(50)
        ->get();

    return Inertia::render('surnames', [
        'names' => $names
    ]);
})->name('surnames');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
