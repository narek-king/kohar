<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\News;
use App\Http\Requests;

class NewsController extends Controller
{
    //
    /**
     * Retrives List of all News (paged)
     *
     * @return string
     */
    public function allNews(){
        $news = News::paginate(env('PAGINATE_DEFAULT'));

        return $news->toJson();
    }

    /**
     * Retrives singel music
     * @param int
     * @return string
     */
    public function show ($id){
        $track = News::find($id);

        //
        return $track->toJson();

    }
}
