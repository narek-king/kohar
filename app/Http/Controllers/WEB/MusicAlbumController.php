<?php

namespace App\Http\Controllers\WEB;

//use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Input;
use Illuminate\Support\Facades\Storage;
use App\MusicAlbum;
use Validator;
class MusicAlbumController extends Controller
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


        $validator = Validator::make(request()->all(), [
            'name' => 'required|unique:music_albums',
            'small' => 'required',
            'large' => 'required',
        ]);

//        $this->validate(request(), ['name' => 'required|unique:music_albums', 'cover' => 'required']);


        if ($validator->fails()) {
            return response()->json([$validator->messages()->getMessages(), 500]);
        }

        if (request()->hasFile('small') && request()->hasFile('large')){
            $album = MusicAlbum::forceCreate(['name' => request()->input('name')]);
            $small = request()->file('small');
            $large = request()->file('large');
            $small->storeAs('images/'.$album->id, 'small.'.$small->extension());
            $large->storeAs('images/'.$album->id, 'large.'.$small->extension());
        }
        else{
            return response()->json([['data' => 'error uploading file'], 500]);
        }

        return response()->json([['data' => 'success'], 200]);
    }


    /**
     * Update existing  instance
     * @param  int
     * @return string
     */
    public function Update(int $id){
        $instance = MusicAlbum::find($id);
        $this->validate(request(), ['name' => 'required']);
        $instance->name = request()->input('name');
        if (request()->hasFile('cover')){
            Storage::delete($instance->cover);
            $instance->cover = request()->file('cover')->store('images/music-album-covers');
        }
        $instance->save();

        return response()->json([['data' => 'success'], 200]);
    }

    /**
     * Delete existing  instance
     * @param  int
     * @return string
     */
    public function Delete($id){
        $instance = MusicAlbum::find($id);
        Storage::delete($instance->cover);
        $instance->delete();
        return response()->json([['data' => 'success'], 200]);
    }
}
