<?php

namespace App\Http\Controllers\API;

use Illuminate\Auth\Access\Response;
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
    public function allConcerts(){
        $concert = Concert::orderby('date', 'desc')->paginate(env('PAGINATE_DEFAULT'));
        ApiLogger::logInfo();
        return response()->json($concert);
    }

    /**
     * Retrives singel concert
     * @param int
     * @return string
     */
    public function show ($id){
        $concert = Concert::find($id);
        ApiLogger::logInfo();
        return response()->json($concert);

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
            $current = Carbon::createFromTimestamp($concert->date);
            if($current->year == $year){
               array_push($result, $concert);
            }
        }
        ApiLogger::logInfo();
        return response()->json($result);
    }
}
