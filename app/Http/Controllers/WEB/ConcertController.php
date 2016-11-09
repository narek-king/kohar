<?php

namespace App\Http\Controllers\WEB;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Concert;


class ConcertController extends Controller
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
        $newInstance = new Concert();
//        $this->validate(request(), ['image' => 'required|unique:music_albums', 'country' => 'required']);

        if (request()->hasFile('image')){
            $newInstance->image = request()->file('image')->store('images/concerts');
        }
        $newInstance->country = request()->input('country');
        $newInstance->city = request()->input('city');
        $newInstance->place = request()->input('place');
        $newInstance->date = request()->input('date');
        $newInstance->description = request()->input('description');
        $newInstance->save();
        return 'success';
    }


    /**
     * Update existing  instance
     * @param  int
     * @return string
     */
    public function Update($id){
        $instance = Concert::find($id);

        if (request()->hasFile('image')){
            Storage::delete($instance->image);
            $instance->image = request()->file('image')->store('images/concerts');
        }
        $instance->country = request()->input('country');
        $instance->city = request()->input('city');
        $instance->place = request()->input('place');
        $instance->date = request()->input('date');
        $instance->description = request()->input('description');
        $instance->save();

        return back();
    }

    /**
     * Delete existing  instance
     * @param  int
     * @return string
     */
    public function Delete($id){
        $instance = Concert::find($id);
        Storage::delete($instance->image);
        $instance->delete();
        return 'deleted';
    }
}
