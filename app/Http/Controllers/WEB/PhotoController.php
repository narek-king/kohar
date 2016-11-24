<?php
namespace App\Http\Controllers\WEB;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Photo;
use Validator;
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
        $validator = Validator::make(request()->all(), [
            'image' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([$validator->messages()->getMessages(), 500]);
        }
        if (request()->hasFile('image')){
           $image = request()->file('image')->store('images/gallery');
        }
        else{
            return response()->json(['data' => 'File upload error'], 500);
        }
        $instance = Photo::forceCreate([
            'image' => $image,
            'name' => request()->input('name'),
            'photo_album_id' => request()->input('album_id')]);
        return response()->json(['data' => 'success', $instance], 200);
    }
    /**
     * Update existing  instance
     * @param  int
     * @return string
     */
    public function Update($id){
        $instance = Photo::find($id);
        if(request()->has('name'))
            $instance->name = request()->input('name');
        if(request()->has('album_id'))
            $instance->photo_album_id = request()->input('album_id');
        if (request()->hasFile('image')){
            Storage::delete($instance->image);
            $instance->image = request()->file('image')->store('images/gallery');
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
        Storage::delete($instance->image);
        $instance->delete();
        return response()->json(['data' => 'success'], 200);
    }
}