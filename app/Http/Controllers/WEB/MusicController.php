<?php

namespace App\Http\Controllers\WEB;

use App\Music;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use kohar\SoundCloudeApi\SoundCloudeClient;
use Validator;

class MusicController extends Controller {

    protected $SoundCloudeClient;

    public function __construct(SoundCloudeClient $SoundCloudeClient)
    {
        $this->middleware('auth');

        $this->SoundCloudeClient = $SoundCloudeClient;
    }
    /**
     * Create new instance
     *
     * @return string
     */
    public function Create(){


        $validator = Validator::make(request()->all(), [
            'track' => 'required',
            'link' => 'required',
            'music_album_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([$validator->messages()->getMessages()], 500);
        }

        if (request()->hasFile('lyrics_am') && request()->hasFile('lyrics_en')){
            $am = request()->file('lyrics_am');
            $en = request()->file('lyrics_en');
//            if ($am->guessClientExtension() != 'json' && $en->guessClientExtension() != 'json')
//                return response()->json(['data' => 'the file format is wrong'], 500);

            $music = Music::forceCreate([
                'track' => request()->input('track'),
                'link' => $this->SoundCloudeClient->getStreamUrlFromURL(request()->input('link')),
                'duration' => $this->SoundCloudeClient->getDurationFromURL(request()->input('link')),
                'performer' => request()->input('performer'),
                'music_by' => request()->input('music_by'),
                'lyrics_by' => request()->input('lyrics_by'),
                'music_album_id' => request()->input('music_album_id'),
                'is_published' => request()->input('is_published'),
                'is_favorite' => request()->input('is_favorite'),
            ]);
            $am->storeAs('lyrics/'.$music->id, 'am.json');
            $en->storeAs('lyrics/'.$music->id, 'en.json');
        }
        return response()->json(['data' => 'success', $music], 200);

    }


    /**
     * Update existing  instance
     * @param  int
     * @return string
     */
    public function Update($id){

        $validator = Validator::make(request()->all(), [
            'track' => 'required',
            'link' => 'required',
            'music_album_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([$validator->messages()->getMessages()], 500);
        }

        if (request()->hasFile('lyrics_am')) {
            $am = request()->file('lyrics_am');
//            if ($am->extension() == 'json') {
                Storage::delete('lyrics/' . $id . '/am.json');
                $am->storeAs('lyrics/' . $id , 'am.json');
//            }
        }
        if (request()->hasFile('lyrics_en')) {
            $en = request()->file('lyrics_en');
//            if ($en->extension() == 'json') {
                Storage::delete('lyrics/' . $id . '/en.json');
                $en->storeAs('lyrics/' . $id , '/en.json');
//            }
        }
        
        $instance = Music::find($id);
        /*
             *  // The File may be required for uploading lyrics
               if (request()->hasFile('image')){
                   $newInstance->image = request()->file('image')->store('images/concerts');
               }
            */
//        $this->validate(request(), ['track' => 'required', 'link' => 'required']);
        $instance->track = request()->input('track');
//        $instance->link = $this->SoundCloudeClient->getStreamUrlFromURL(request()->input('link'));
//        $instance->duration = $this->SoundCloudeClient->getDurationFromURL(request()->input('link'));
        $instance->performer = request()->input('performer');
        $instance->music_by = request()->input('music_by');
        $instance->lyrics_by = request()->input('lyrics_by');
        $instance->music_album_id = request()->input('music_album_id');
        $instance->is_published = request()->input('is_published');
        $instance->is_favorite = request()->input('is_favorite');
        $instance->save();

        return response()->json(['data' => 'success'], 200);
    }

    /**
     * Delete existing  instance
     * @param  int
     * @return string
     */
    public function Delete($id){
        $instance = Music::find($id);
        Storage::delete('lyrics/' . $id . '/en.json');
        Storage::delete('lyrics/' . $id . '/am.json');
        $instance->delete();
        return response()->json(['data' => 'deleted'], 200);
    }
}
