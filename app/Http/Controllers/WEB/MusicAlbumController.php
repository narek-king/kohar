<?php

namespace App\Http\Controllers\WEB;

//use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Input;
use Illuminate\Support\Facades\Storage;
use App\MusicAlbum;
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
        $newInstance = new MusicAlbum();
        $newInstance->name= "DDbajkhsd";
        $newInstance->cover= "sdkndsbajkhsd";
        //$this->validate(request(), ['name' => 'required|unique:music_albums', 'cover' => 'required']);

        //if (request()->hasFile('cover')){
        //    $newInstance->cover = request()->file('cover')->store('images/music-album-covers');
        //    $newInstance->name = request()->input('name');
        //    $newInstance->save();
        //}
        //else{
        //    echo 'File upload error';
        //}

        $newInstance->save();
        return 'success';
    }


    /**
     * Update existing  instance
     * @param  int
     * @return string
     */
    public function Update($id){
        $instance = MusicAlbum::find($id);
        $this->validate(request(), ['name' => 'required']);
        $instance->name = request()->input('name');
        if (request()->hasFile('cover')){
            Storage::delete($instance->cover);
            $instance->cover = request()->file('cover')->store('images/music-album-covers');
        }
        $instance->save();

        return "success";
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
        return 'deleted';
    }
}
