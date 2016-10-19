<?php

namespace App\Http\Controllers\API;
use App\Music;

use Illuminate\Http\Request;

use App\Http\Requests;

class MusicController extends Controller
{
    //
    /**
     * Retrives List of all tracks (paged)
     *
     * @return string
     */
    public function musicList(){
        $music = Music::paginate(env('PAGINATE_DEFAULT'));

       echo $music->toJson();
    }

    /**
     * Retrives singel music
     * @param int
     * @return string
     */
    public function show ($id){
        $track = Music::find($id);

        //
        return $track->toJson();

    }

    public function search ($track){

        $result = Music::where('track', 'LIKE', '%'.$track.'%')->get();
//        $result::paginate(env('PAGINATE_DEFAULT'));
        return $result->toJson();
    }
}
