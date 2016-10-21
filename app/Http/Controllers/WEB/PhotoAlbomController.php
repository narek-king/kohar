<?php

namespace App\Http\Controllers\WEB;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\PhotoAlbum;

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
        $newInstance = new PhotoAlbum();
        $this->validate(request(), ['name' => 'required|unique:photo_albums', 'cover' => 'required']);

        if (request()->hasFile('cover')){
            $newInstance->cover = request()->file('cover')->store('images/phto-album-covers');
            $newInstance->name = request()->input('name');
            $newInstance->save();
        }
        else{
            echo 'File upload error';
        }

//        return ' <img src=http://'. request()->getHttpHost() .'/'.$newInstance->cover.'> <br> title: '. $newInstance->name;
        return 'success';
    }


    /**
     * Update existing  instance
     * @param  int
     * @return string
     */
    public function Update($id){
        $instance = PhotoAlbum::find($id);
        $this->validate(request(), ['name' => 'required']);
        $instance->name = request()->input('name');
        if (request()->hasFile('cover')){
            Storage::delete($instance->cover);
            $instance->cover = request()->file('cover')->store('images/photo-album-covers');
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
        $instance = PhotoAlbum::find($id);
        Storage::delete($instance->cover);
        $instance->delete();
        return 'deleted';
    }
}
