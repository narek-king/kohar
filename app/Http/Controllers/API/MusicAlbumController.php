<?php

namespace App\Http\Controllers\API;


use Illuminate\Http\Request;
use App\MusicAlbum;
use App\Music;
use App\Http\Requests;

class MusicAlbumController extends Controller
{
    /**
     * Retrives List of music albums (paged)
     *
     * @return string
     */
    public function musicAlbums(){
        $musicAlbums = MusicAlbum::paginate(env('PAGINATE_DEFAULT'));

        return $musicAlbums->toJson();
    }
    /**
     * RRetrives singel music album whith its list of tracks
     * @param int
     * @return string
     */
    public function show ($id){
        $tracks = MusicAlbum::find($id)->musics;

            //
            return $tracks->toJson();

    }


}
