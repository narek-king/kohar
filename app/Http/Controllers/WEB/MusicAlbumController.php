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
            $small = request()->file('small');
            $large = request()->file('large');
            if ($small->extension() != 'png' && $large->extension() != 'png')
                return response()->json([['data' => 'the file must be png'], 500]);

            $album = MusicAlbum::forceCreate(['name' => request()->input('name')]);
            $small->storeAs('images/'.$album->id, 'small.'.$small->extension());
            $large->storeAs('images/'.$album->id, 'large.'.$large->extension());
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

        $validator = Validator::make(request()->all(), [
            'name' => 'required|unique:music_albums']);

        if ($validator->fails()) {
            return response()->json([$validator->messages()->getMessages(), 500]);
        }


        if (request()->hasFile('small')) {
            $small = request()->file('small');
            if ($small->extension() != 'png') {
                Storage::delete('images/' . $id . '/small.png');
                $small->storeAs('images/'.$id, 'small.'.$small->extension());
            }
        }
        if (request()->hasFile('large')) {
            $large = request()->file('large');
            if ($large->extension() != 'png') {
                Storage::delete('images/' . $id . '/large.png');
                $large->storeAs('images/'.$id, 'large.'.$large->extension());
            }
        }

        $instance->name = request()->input('name');
        $instance->save();

        return response()->json([['data' => 'edited'], 200]);
    }

    /**
     * Delete existing  instance
     * @param  int
     * @return string
     */
    public function Delete($id){
        $instance = MusicAlbum::find($id);
        Storage::delete('images/' . $id . '/large.png');
        Storage::delete('images/' . $id . '/small.png');
        $instance->delete();
        return response()->json([['data' => 'deleted'], 200]);
    }
}
