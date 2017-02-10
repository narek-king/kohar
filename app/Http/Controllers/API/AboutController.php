<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\About;

class AboutController extends Controller
{
    //

    public function index ()
    {
        return About::find(1);
    }

    public function edit(Request $request)
    {
        $image = 'no image';
        if (request()->hasFile('file')){
            $image = request()->file('file');
            if($image->extension() != 'png')
                return response('file must be png', 403);
            $image = $image->storeAs('images', 'about.png');
         }
         if ($request->has('text')){
             $obj = About::find(1);
             $obj->text = $request->input('text');
             $obj->save();
         }
        return $request->all();
    }

    /**
     * Retrives links
     * @param
     * @return string
     */
    public function links (){
//        $links = ([
//
//            'kohar_website' => "http://koharconcert.com/",
//            'kohar_blog' => "http://koharblog.com/",
//            'kohar_library' => "http://koharlibrary.com/",
//            'kohar_music_school' =>  "",
//            'kohar_kohar_artisan' =>  "http://koharbookbindery.com/",
//            'facebook' => "https://www.facebook.com/KOHARSymphonyOrchestraChoir/",
//            'twitter' => "https://twitter.com/KOHARConcert",
//            'youtube' => "https://www.youtube.com/channel/UCnU3NnNUkCjNF70siIUI6Ag",
//            'flickr' => "https://www.flickr.com/photos/hayasa",
//            'wikipedia' => "https://en.wikipedia.org/wiki/KOHAR_Symphony_Orchestra_and_Choir",
//            'news' => "http://koharblog.com/all-news/",
//            'shop' => "http://www.cdrama.com/index.php?p=catalog&mode=search&search_in=all&search_str=KOHAR%20SYMPHONY%20ORCHESTRA%20&%20CHOIR&x=70&y=8",
//
//        ]);
//        return response()->json($links);
        $links  = json_decode(About::find(2)->text, true);
        return $links;
    }

    public function editLinks(Request $request)
    {
        $ln = About::find(2);
        $links = json_encode($request->input('text'));
        $ln->text = $links;
        $ln->save();
        return $links;
    }

}
