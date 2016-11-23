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


        //        $this->validate(request(), ['image' => 'required|unique:music_albums', 'country' => 'required']);

        if (request()->hasFile('image')){
            $image = request()->file('image')->store('images/concerts');

        $instance = Concert::forceCreate([
            'country' => request()->input('country'),
            'image' => $image,
            'city' => request()->input('city'),
            'link' => request()->input('link'),
            'place' => request()->input('place'),
            'date' => request()->input('date'),
            'description' => request()->input('description')]);
        }
        else {return response()->json(['data' => 'error uploading file'], 500);}
        return response()->json(['data' => 'success', $instance], 200);
    }


    /**
     * Update existing  instance
     * @param  int
     * @return string
     */
    public function Update($id){




        $instance = Concert::find($id);
        $imagePath = $instance->image;
        if (request()->hasFile('imageFile')){
            Storage::delete($instance->image);
            $imagePath = request()->file('imageFile')->store('images/concerts');
            $instance->image = $imagePath;

        }
        $instance->country = request()->input('country');
        $instance->city = request()->input('city');
        $instance->link = request()->input('link');
        $instance->place = request()->input('place');
        $instance->date = request()->input('date');
        $instance->description = request()->input('description');
        $instance->save();

        return response()->json(['data' => 'success', 'imagePath' => $imagePath], 200);
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
        return response()->json(['data' => 'success'], 200);
    }
}
