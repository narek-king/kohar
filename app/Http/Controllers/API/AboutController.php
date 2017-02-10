<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\About;

class AboutController extends Controller
{
    //

    public function index ()
    {
        return About::find(1);
    }

    public function edit(Request $request)
    {
        $image = 'no image';
        if (request()->hasFile('file')){
            $image = request()->file('file');
            if($image->extension() != 'png')
                return response('file must be png', 403);
            $image = $image->storeAs('images', 'about.png');
         }
         if ($request->has('text')){
             $obj = About::find(1);
             $obj->text = $request->input('text');
             $obj->save();
         }
        return $request->all();
    }
}
