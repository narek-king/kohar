<?php

namespace App\Http\Controllers\WEB;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MusicAlbumController extends Controller
{
    //
    public function Create(Request $request){
        $name = $request->input('name');
        $request->file('cover')->store('music-album-covers');
        return 'posted '. $name . ' ';
    }

    public function Update($id){
        return 'updated';
    }

    public function Delete($id){
        return 'deleted';
    }
}
