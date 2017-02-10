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
use App\MusicAlbum;

//Route::get('/', function () {
//    return view('welcome');
//    return redirect('dashboard');
//});

Auth::routes();

Route::get('/home', 'HomeController@index');
Route::get('/test', function(){
	echo var_dump(request()->getHttpHost());
});
Route::group(['middleware' => 'auth'], function()
{
    Route::get('/', function() {
        $list = MusicAlbum::find(6);
       return view('index');
//       return view('dashboard', compact('list'));
    } );

    Route::post('/music-album', 'WEB\MusicAlbumController@Create');
    Route::post('/music-album/{id}', 'WEB\MusicAlbumController@Update');
    Route::delete('/music-album/{id}', 'WEB\MusicAlbumController@Delete');

    Route::post('/music', 'WEB\MusicController@Create');
    Route::post('/music/{id}', 'WEB\MusicController@Update');
    Route::delete('/music/{id}', 'WEB\MusicController@Delete');

    Route::post('/video', 'WEB\VideoController@Create');
    Route::put('/video/{id}', 'WEB\VideoController@Update');
    Route::delete('/video/{id}', 'WEB\VideoController@Delete');

    Route::post('/concert', 'WEB\ConcertController@Create');
    Route::post('/concert/{id}', 'WEB\ConcertController@Update');
    Route::delete('/concert/{id}', 'WEB\ConcertController@Delete');

    Route::post('/photo-album', 'WEB\PhotoAlbomController@Create');
    Route::post('/photo-album/{id}', 'WEB\PhotoAlbomController@Update');
    Route::delete('/photo-album/{id}', 'WEB\PhotoAlbomController@Delete');

    Route::post('/photo', 'WEB\PhotoController@Create');
    Route::post('/photo/{id}', 'WEB\PhotoController@Update');
    Route::delete('/photo/{id}', 'WEB\PhotoController@Delete');

    Route::post('/about', 'API\AboutController@edit');
    Route::post('/links', 'API\AboutController@editLinks');

});

/*

Route::get('makelink', function(){
    if (symlink ('/home/horizor0/public_html/kohar/storage/app/images', '/home/horizor0/public_html/kohar/public/images' ) &&
            symlink ('/home/horizor0/public_html/kohar/storage/app/lyrics', '/home/horizor0/public_html/kohar/public/lyrics' ))
        echo 'symlink created';
});*/


/*
Route::get('makelink', function(){
    if (symlink ('/home/horizor0/public_html/kohar/storage/app/lyric', '/home/horizor0/public_html/kohar/public/lyric' ))
        echo 'symlink created';
});*/

