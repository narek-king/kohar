<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Music extends Model
{
    //

    public function musicAlbum(){
        return $this->belongsTo('App\MusicAlbum');
    }
}
