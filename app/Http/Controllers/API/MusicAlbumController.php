<?php

namespace App\Http\Controllers\API;


use Illuminate\Http\Request;
use App\MusicAlbum;
use App\Music;
use App\Http\Requests;
use Illuminate\Support\Facades\DB;

class MusicAlbumController extends Controller
{
    /**
     * Retrives List of music albums (paged)
     *
     * @return string
     */
    public function musicAlbums(){

//        $musicAlbumarray = DB::table('music_albums')->get(['*', DB::raw('1 as quantity')]);

        $musicAlbums = MusicAlbum::paginate(env('PAGINATE_DEFAULT'));
        $musicAlbumarray = $musicAlbums->toArray();


        foreach ($musicAlbums as $key => $musicAlbum){
        $musicAlbumarray['data'][$key] += ['quantity' => $musicAlbum->musics->count()];
        }

        ApiLogger::logInfo();
        return response()->json($musicAlbumarray);
    }

    public function musicAlbumsWithImage(){

//        $musicAlbumarray = DB::table('music_albums')->get(['*', DB::raw('1 as quantity')]);

        $musicAlbums = MusicAlbum::paginate(env('PAGINATE_DEFAULT'));
        $musicAlbumarray = $musicAlbums->toArray();


        foreach ($musicAlbums as $key => $musicAlbum){
            $musicAlbumarray['data'][$key] += ['quantity' => $musicAlbum->musics->count()];
            $musicAlbumarray['data'][$key] += ['small' => '/images/music/'.$musicAlbum->id.'/small.png'];
            $musicAlbumarray['data'][$key] += ['large' => '/images/music/'.$musicAlbum->id.'/large.png'];
        }

        ApiLogger::logInfo();
        return response()->json($musicAlbumarray);
    }

    /**
     * RRetrives singel music album whith its list of tracks
     * @param int
     * @return string
     */
    public function show ($id){
        $tracks = MusicAlbum::find($id)->musics;
        ApiLogger::logInfo();
        return response()->json($tracks);
    }


}
