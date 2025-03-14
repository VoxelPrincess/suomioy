<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

// --- CONTROLLERS ---
use App\Http\Controllers\PersonController;
use App\Http\Controllers\SurnameController;

// --- HOME ROUTE ---
Route::get('/', function (): Response {
    return Inertia::render('welcome');
})->name('home');

// --- PERSON ROUTES ---
// Show a single person
Route::get('/person/{id}', [PersonController::class, 'view'])
    ->name('person');

// Update a person (deathday etc.)
Route::post('/person/{id}', [PersonController::class, 'post'])
    ->name('person.update');

// --- SURNAME ROUTES ---
// List surnames (top surnames by count)
Route::get('/surnames', [SurnameController::class, 'index'])
    ->name('surnames');

// Show details of people with a given surname
Route::get('/surnames/{name}', [SurnameController::class, 'show'])
    ->name('surname');

// --- OTHER ROUTES ---
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
