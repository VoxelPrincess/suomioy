<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Illuminate\Support\Facades\DB;

Route::get('/', function (): InertiaResponse {
    return Inertia::render('welcome');
})->name('home');

Route::get('/person/{id}', function (string $id): InertiaResponse {
    $person = DB::table('person')
        ->select([
            '*' // Fetching all columns is bad practice, define specific columns in real applications
        ])
        ->where('id', '=', $id)
        ->firstOrFail();

    return Inertia::render('person', [
        'person' => $person,
    ]);
})->name('person');

### ✅ **Добавлен маршрут для списка фамилий (`/surnames`)**
Route::get('/surnames', function (): InertiaResponse {
    $names = DB::table('person')
        ->select([
            'last_name AS name',
            DB::raw('COUNT(last_name) as amount')
        ])
        ->groupBy('last_name')
        ->orderBy('amount', 'DESC')
        ->limit(50) // Показываем топ-50 фамилий
        ->get();

    return Inertia::render('surnames', [
        'names' => $names
    ]);
})->name('surnames');

Route::get('/surnames/{name}', function (string $name): InertiaResponse {
    // Capitalize the first letter of the surname before using it in queries
    $formattedName = ucfirst($name);

    // Retrieve the count of people with the given surname
    $data = DB::table('person')
        ->select([
            'last_name AS name',
            DB::raw('COUNT(last_name) as amount')
        ])
        ->groupBy('last_name')
        ->orderBy('amount', 'DESC')
        ->where('last_name', '=', $formattedName)
        ->firstOrFail();

    // Retrieve the 30 oldest living people with the given surname
    $oldestLiving = DB::table('person')
        ->select([
            'id',
            'first_name',
            'last_name',
            'birthday'
        ])
        ->where('last_name', '=', $formattedName)
        ->whereNull('deathday') // Only include living people (death date is null)
        ->orderBy('birthday', 'DESC') // Sort by birthday, oldest first
        ->limit(30) // Get the first 30 oldest people
        ->get();

    return Inertia::render('surname', [
        'name' => $data,
        'oldestLiving' => $oldestLiving
    ]);
})->name('surname');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
