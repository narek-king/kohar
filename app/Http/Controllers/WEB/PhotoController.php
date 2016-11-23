<?php

namespace App\Http\Controllers\WEB;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Photo;

class PhotoController extends Controller
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




        $newInstance = new Photo();
        $this->validate(request(), ['photo' => 'required']);

        if (request()->hasFile('photo')){
            $newInstance->photo = request()->file('photo')->store('images/gallery');
        }
        else{
            return 'File upload error';
        }
        $newInstance->name = request()->input('name');
        $newInstance->photo_album_id = request()->input('photo_album_id');
        $newInstance->save();
        return response()->json(['data' => 'success'], 200);
    }


    /**
     * Update existing  instance
     * @param  int
     * @return string
     */
    public function Update($id){
        $instance = Photo::find($id);

        $instance->name = request()->input('name');
        $instance->photo_album_id = request()->input('photo_album_id');

        if (request()->hasFile('photo')){
            Storage::delete($instance->photo);
            $instance->photo = request()->file('photo')->store('images/gallery');
        }
        $instance->save();
        return response()->json(['data' => 'success'], 200);
    }

    /**
     * Delete existing  instance
     * @param  int
     * @return string
     */
    public function Delete($id){
        $instance = Photo::find($id);
        Storage::delete($instance->photo);
        $instance->delete();
        return response()->json(['data' => 'success'], 200);
    }
}
