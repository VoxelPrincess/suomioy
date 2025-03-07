<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

Route::get('/', function (): InertiaResponse {
    return Inertia::render('welcome');
})->name('home');

### **Route to fetch a specific person by ID**
Route::get('/person/{id}', function (string $id): InertiaResponse {
    $person = DB::table('person')
        ->select([
            'id',
            'first_name',
            'last_name',
            'birthday',
            'deathday'
        ])
        ->where('id', '=', $id)
        ->firstOrFail();

    return Inertia::render('person', [
        'person' => $person,
    ]);
})->name('person');

### **Route to fetch a list of surnames (`/surnames`)**
Route::get('/surnames', function (): InertiaResponse {
    $names = DB::table('person')
        ->select([
            'last_name AS name',
            DB::raw('COUNT(last_name) as amount'),
            DB::raw('MIN(id) as id') // Include the ID of one person with this surname
        ])
        ->groupBy('last_name')
        ->orderBy('amount', 'DESC')
        ->limit(50) // Show the top 50 surnames
        ->get();

    return Inertia::render('surnames', [
        'names' => $names
    ]);
})->name('surnames');

### **Route to fetch details of a specific surname (`/surnames/{name}`)**
Route::get('/surnames/{name}', function (string $name): InertiaResponse {
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

    // Retrieve a list of people with this surname
    $people = DB::table('person')
        ->select([
            'id',
            'first_name',
            'last_name',
            'birthday'
        ])
        ->where('last_name', '=', $formattedName)
        ->orderBy('birthday', 'ASC') // Sort by birthday first
        ->orderBy('first_name', 'DESC') // Then by first name in descending order
        ->orderBy('id', 'ASC') // Finally, by ID for stability
        ->get();

    return Inertia::render('surname', [
        'name' => $data,
        'people' => $people
    ]);
})->name('surname');

### **Route for updating a person's deathday (`POST /person/{id}`)**
Route::post('/person/{id}', function (Request $request, string $id) {
    // Validate the input, deathday should be either a date or null
    $validatedData = $request->validate([
        'deathday' => 'nullable|date', // Ensures it's a valid date or null
    ]);

    // Update deathday in the database
    DB::table('person')
        ->where('id', '=', $id)
        ->update([
            'deathday' => $validatedData['deathday'],
        ]);

    // Redirect back to the person's page
    return redirect()->route('person', ['id' => $id]);
})->name('update-person');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
