<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Photo;
use App\Http\Requests;

class PhotoController extends Controller
{
    //
    /**
     * Retrives List of music albums (paged)
     *
     * @return string
     */
    public function photolist(){
        $albums = Photo::paginate(env('PAGINATE_DEFAULT'));
        ApiLogger::logInfo();
        return response()->json($albums);
    }
    /**
     * RRetrives singel music album whith its list of tracks
     * @param int
     * @return string
     */
    public function show ($id){
        $tracks = Photo::find($id);
        ApiLogger::logInfo();
        return response()->json($tracks);
    }
}
