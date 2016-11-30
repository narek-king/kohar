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
        ApiLogger::logInfo();
        return response()->json($news);
    }

    /**
     * Retrives singel music
     * @param int
     * @return string
     */
    public function show ($id){
        $track = News::find($id);
        ApiLogger::logInfo();
        return response()->json($track);

    }
    /**
     * Retrives links
     * @param
     * @return string
     */
    public function links (){
        $links = ([
            'Website ' => 'http://koharconcert.com/',
            'Blog ' => 'http://koharblog.com/',
            'Library ' => 'http://koharlibrary.com/',
            'Artisan ' => 'http://koharbookbindery.com/',
            'Facebook' => 'https://www.facebook.com/KOHARSymphonyOrchestraChoir/',
            'Flickr' =>'https://www.flickr.com/photos/hayasa/',
            'Wikipedia' =>'https://en.wikipedia.org/wiki/KOHAR_Symphony_Orchestra_and_Choir/',
//            'SoundCloud' => 'https://soundcloud.com/user-346757815/'
        ]);
        return response()->json($links);

    }


}
