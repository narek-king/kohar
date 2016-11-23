<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');

Route::get('/music-album', 'API\MusicAlbumController@musicAlbums');
Route::get('/music-album-image', 'API\MusicAlbumController@musicAlbumsWithImage');
Route::get('/music-album/{id}', 'API\MusicAlbumController@show');
Route::get('/music', 'API\MusicController@musicList');
Route::get('/music/{id}', 'API\MusicController@show');
Route::get('/music/search/{track}', 'API\MusicController@search');
Route::get('/video', 'API\VideoController@videoList');
Route::get('/concert', 'API\ConcertController@allConcerts');
Route::get('/concert/{id}', 'API\ConcertController@show');
Route::get('/concert/year/{year}', 'API\ConcertController@year');
Route::get('/news', 'API\NewsController@allNews');
Route::get('/news/{id}', 'API\NewsController@show');
Route::get('/news/{id}', 'API\NewsController@show');
Route::get('/photo-album', 'API\PhotoAlbomController@photoAlbums');
Route::get('/photo-album-image', 'API\PhotoAlbomController@photoAlbumsWithImage');
Route::get('/photo-album/{id}', 'API\PhotoAlbomController@show');
Route::get('/photo', 'API\PhotoController@photoList');
Route::get('/photo/{id}', 'API\PhotoController@show');
