<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Concert;
use App\Http\Requests;
use Carbon\Carbon;

use App\Http\Controllers\API\ApiLogger;

class ConcertController extends Controller
{
    //
    /**
     * Retrives List of all concerts (paged)
     * @param Request
     * @return string
     */
    public function allConcerts(Request $request){
        $concert = Concert::paginate(env('PAGINATE_DEFAULT'));
        ApiLogger::logInfo($request);
        return $concert->toJson();
    }

    /**
     * Retrives singel concert
     * @param int
     * @return string
     */
    public function show ($id){
        $concert = Concert::find($id);

        return $concert->toJson();

    }

    /**
     * Retrives singel concert
     * @param int
     * @return string
     */
    public function year ($year){
        $concerts = Concert::all();
        $result= array();
        foreach ($concerts as $concert){
            $current = Carbon::createFromFormat('Y-m-d', $concert->date);
            if($current->year == $year){
               array_push($result, $concert);
            }
        }


        return json_encode($result);

    }
}
