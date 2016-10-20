<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/', function () {
//    return view('welcome');
    return redirect('dashboard');
});

Auth::routes();

Route::get('/home', 'HomeController@index');
Route::get('/test', function(){
	echo var_dump(request()->getHttpHost());
});
Route::group(['middleware' => 'auth'], function()
{
    Route::get('dashboard', function() {
       return view('dashboard');
    } );

    Route::post('/music-album', 'WEB\MusicAlbumController@Create');
    Route::put('/music-album{id}', 'WEB\MusicAlbumController@Update');
    Route::delete('/music-album{id}', 'WEB\MusicAlbumController@Delete');

    Route::post('/music', 'WEB\MusicController@Create');
    Route::put('/music{id}', 'WEB\MusicController@Update');
    Route::delete('/music{id}', 'WEB\MusicController@Delete');

    Route::post('/video', 'WEB\VideoController@Create');
    Route::put('/video{id}', 'WEB\VideoController@Update');
    Route::delete('/video{id}', 'WEB\VideoController@Delete');

    Route::post('/concert', 'WEB\ConcertController@Create');
    Route::put('/concert{id}', 'WEB\ConcertController@Update');
    Route::delete('/concert{id}', 'WEB\ConcertController@Delete');

    Route::post('/photo-album', 'WEB\PhotoAlbomController@Create');
    Route::put('/photo-album{id}', 'WEB\PhotoAlbomController@Update');
    Route::delete('/photo-album{id}', 'WEB\PhotoAlbomController@Delete');

    Route::post('/photo', 'WEB\PhotoController@Create');
    Route::put('/photo{id}', 'WEB\PhotoController@Update');
    Route::delete('/photo{id}', 'WEB\PhotoController@Delete');

});

/*
Route::get('makelink', function(){
    if (symlink ('/home/horizor0/public_html/kohar/storage/app/images', '/home/horizor0/public_html/kohar/public/images' ))
        echo 'symlink created';
});
*/
