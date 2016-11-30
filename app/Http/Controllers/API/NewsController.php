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

            'Kohar Website' => "http://koharconcert.com/",
            'Kohar Blog' => "http://koharblog.com/",
            'Kohar Library' => "http://koharlibrary.com/",
            'Kohar Music School' =>  "",
            'Kohar Kohar Artisan' =>  "http://koharbookbindery.com/",
            'Facebook' => "https://www.facebook.com/KOHARSymphonyOrchestraChoir/",
            'Twitter' => "https://twitter.com/KOHARConcert",
            'Youtube' => "https://www.youtube.com/channel/UCnU3NnNUkCjNF70siIUI6Ag",
            'Flickr' => "https://www.flickr.com/photos/hayasa",
            'Wikipedia' => "https://en.wikipedia.org/wiki/KOHAR_Symphony_Orchestra_and_Choir",
            'News' => "http://koharblog.com/all-news/",
            'Shop' => "http://www.cdrama.com/index.php?p=catalog&mode=search&search_in=all&search_str=KOHAR%20SYMPHONY%20ORCHESTRA%20&%20CHOIR&x=70&y=8",

        ]);
        return response()->json($links);

    }


}
