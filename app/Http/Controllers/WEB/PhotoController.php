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
        $this->validate(request(), ['image' => 'required']);

        if (request()->hasFile('image')){
            $newInstance->image = request()->file('image')->store('images/gallery');
        }
        else{
            return 'File upload error';
        }
        $newInstance->name = request()->input('name');
        $newInstance->photo_album_id = request()->input('album_id');
        $newInstance->save();
        return 'success';
    }


    /**
     * Update existing  instance
     * @param  int
     * @return string
     */
    public function Update($id){
        $instance = Photo::find($id);

        $instance->name = request()->input('name');
        $instance->photo_album_id = request()->input('album_id');

        if (request()->hasFile('image')){
            Storage::delete($instance->image);
            $instance->image = request()->file('image')->store('images/gallery');
        }
        $instance->save();
        return back();
    }

    /**
     * Delete existing  instance
     * @param  int
     * @return string
     */
    public function Delete($id){
        $instance = Photo::find($id);
        Storage::delete($instance->image);
        $instance->delete();
        return 'deleted';
    }
}
