<?php

namespace App\Http\Controllers\WEB;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\PhotoAlbum;
use Validator;
class PhotoAlbomController extends Controller
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
            'name' => 'required|unique:photo_albums',
            'cover' => 'required',
            'description' => 'required'
        ]);

//        $this->validate(request(), ['name' => 'required|unique:music_albums', 'cover' => 'required']);


        if ($validator->fails()) {
            return response()->json([$validator->messages()->getMessages(), 500]);
        }

        if (request()->hasFile('cover')){
            $image = request()->file('cover');
            if ($image->extension() != 'png')
                return response()->json([['data' => 'the file must be png'], 500]);

            $album = PhotoAlbum::forceCreate([
                'name' => request()->input('name'),
                'description' => request()->input('description'),
                'cover' => $image->getClientOriginalName()
            ]);
            $image->storeAs('images/photo/'.$album->id, 'image.'.$image->extension());
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
    public function Update($id){
        $instance = PhotoAlbum::find($id);

        $validator = Validator::make(request()->all(), [
            'name' => 'required|unique:photo_albums', 'description' => 'required']);

        if ($validator->fails()) {
            return response()->json([$validator->messages()->getMessages(), 500]);
        }


        if (request()->hasFile('cover')) {
            $image = request()->file('cover');
            if ($image->extension() != 'png') {
                Storage::delete('images/photo/' . $id . '/cover.png');
                $image->storeAs('images/music/'.$id, 'image.'.$image->extension());
            }
        }

        $instance->name = request()->input('name');
        $instance->description = request()->input('description');
        $instance->cover = 'images/music/'.$id.'/image.png';
        $instance->save();

        return response()->json([['data' => 'edited'], 200]);
    }

    /**
     * Delete existing  instance
     * @param  int
     * @return string
     */
    public function Delete($id){
        $instance = PhotoAlbum::find($id);
        Storage::delete('images/photo/' . $id . '/cover.png');
        $instance->delete();
        return response()->json([['data' => 'deleted'], 200]);
    }
}
