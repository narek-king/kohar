<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Video;
use App\Http\Requests;


class VideoController extends Controller
{
    //
    /**
     * Retrives List of all videos (paged)
     *
     * @return string
     */
    public function videoList(){
        $video = Video::paginate(env('PAGINATE_DEFAULT'));

        return $video->toJson();
    }

}
