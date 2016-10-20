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

    public function Create(){
        $newInstance = new MusicAlbum();
        $this->validate(request(), ['name' => 'required|unique:music_albums', 'cover' => 'required']);

        if (request()->hasFile('cover')){
            $newInstance->cover = request()->file('cover')->store('images/music-album-covers');
            $newInstance->name = request()->input('name');
            $newInstance->save();
        }
        else{
            echo 'File upload error';
        }

        return ' <img src=http://'. request()->getHttpHost() .'/'.$newInstance->cover.'> <br> title: '. $newInstance->name;
    }

    public function Update($id){
        return 'updated';
    }

    public function Delete($id){
        return 'deleted';
    }
}
