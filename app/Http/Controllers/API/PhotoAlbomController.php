<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\PhotoAlbum;
use App\Photo;

use App\Http\Requests;

class PhotoAlbomController extends Controller
{
    //
    /**
     * Retrives List of music albums (paged)
     *
     * @return string
     */
    public function photoAlbums(){
        $albums = PhotoAlbum::paginate(env('PAGINATE_DEFAULT'));

        return $albums->toJson();
    }
    /**
     * RRetrives singel music album whith its list of tracks
     * @param int
     * @return string
     */
    public function show ($id){
        $tracks = PhotoAlbum::find($id)->photos;

        //
        return $tracks->toJson();

    }
}
