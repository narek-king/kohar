<?php

namespace App\Http\Controllers\WEB;

use App\Music;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use kohar\SoundCloudeApi\SoundCloudeClient;

class MusicController extends Controller
{
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
        $newInstance = new Music();
        $SCclient = new SoundCloudeClient();


        $this->validate(request(), ['track' => 'required', 'link' => 'required']);
        $newInstance->track = request()->input('track');
     /*
      *  // The File may be required for uploading lyrics and or music track
        if (request()->hasFile('image')){
            $newInstance->image = request()->file('image')->store('images/concerts');
        }
     */
        $newInstance->lyrics = request()->input('lyrics');
        $newInstance->lyrics_am = request()->input('lyrics_am');
        $newInstance->link = $SCclient->getStreamURL(request()->input('link'));
        $newInstance->performer = request()->input('performer');
        $newInstance->music_by = request()->input('music_by');
        $newInstance->lyrics_by = request()->input('lyrics_by');
        $newInstance->music_album_id = request()->input('album_id');
        $newInstance->is_published = request()->input('is_published');
        $newInstance->is_favorite = request()->input('is_favorite');
        $newInstance->save();
        return 'success';
    }


    /**
     * Update existing  instance
     * @param  int
     * @return string
     */
    public function Update($id){
        $instance = Music::find($id);
        /*
             *  // The File may be required for uploading lyrics
               if (request()->hasFile('image')){
                   $newInstance->image = request()->file('image')->store('images/concerts');
               }
            */
        $this->validate(request(), ['track' => 'required', 'link' => 'required']);
        $instance->track = request()->input('track');
        $instance->lyrics = request()->input('lyrics');
        $instance->lyrics_am = request()->input('lyrics_am');
        $instance->link = request()->input('link');
        $instance->performer = request()->input('performer');
        $instance->music_by = request()->input('music_by');
        $instance->lyrics_by = request()->input('lyrics_by');
        $instance->album_id = request()->input('album_id');
        $instance->is_published = request()->input('is_published');
        $instance->is_favorite = request()->input('is_favorite');
        $instance->save();

        return back();
    }

    /**
     * Delete existing  instance
     * @param  int
     * @return string
     */
    public function Delete($id){
        $instance = Music::find($id);

        $instance->delete();
        return 'deleted';
    }
}
