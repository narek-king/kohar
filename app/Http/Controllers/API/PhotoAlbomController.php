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
        ApiLogger::logInfo();
        return response()->json($albums);
    }
    /**
     * RRetrives singel music album whith its list of tracks
     * @param int
     * @return string
     */
    public function show ($id){
        $tracks = PhotoAlbum::find($id)->photos;
        ApiLogger::logInfo();
        return response()->json($tracks);
    }
}
