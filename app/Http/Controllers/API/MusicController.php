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
        ApiLogger::logInfo();
        return response()->json($music);
    }

    /**
     * Retrives singel music
     * @param int
     * @return string
     */
    public function show ($id){
        $track = Music::find($id);
        ApiLogger::logInfo();
        return response()->json($track);



    }

    public function search ($track){

        $result = Music::where('track', 'LIKE', '%'.$track.'%')->get();
      ApiLogger::logInfo();
        return response()->json($result);

    }

    public function favorites ($list)
    {
        $arr = explode(',', $list);
        $result = Music::whereIn('id', $arr)->get();
        return response($result);
    }
}
