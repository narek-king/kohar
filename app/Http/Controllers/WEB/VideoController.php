<?php

namespace App\Http\Controllers\WEB;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Video;

class VideoController extends Controller
{
    //

    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
     * Create new instance
     *
     * @return string
     */
    public function Create(){

        $this->validate(request(), ['link' => 'required']);

        $instance = Video::forceCreate([
            'name' => request()->input('name'),
            'link' => request()->input('link'),
            'performer' => request()->input('performer'),
            'music_by' => request()->input('music_by'),
            'lyrics_by' => request()->input('lyrics_by'),
            'is_published' => request()->input('is_published') ]);

        return response()->json(['data' => 'success', $instance], 200);
    }


    /**
     * Update existing  instance
     * @param  int
     * @return string
     */
    public function Update($id){
        $instance = Video::find($id);
//        $this->validate(request(), ['link' => 'required']);

        $instance->name = request()->input('name');
        $instance->link = request()->input('link');
        $instance->performer = request()->input('performer');
        $instance->music_by = request()->input('music_by');
        $instance->lyrics_by = request()->input('lyrics_by');
//        $instance->is_published = request()->input('is_published');

        $instance->save();


        return response()->json(['data' => 'success'], 200);
    }

    /**
     * Delete existing  instance
     * @param  int
     * @return string
     */
    public function Delete($id){
        $instance = Video::find($id);

        $instance->delete();
        return response()->json(['data' => 'success'], 200);
    }
}
