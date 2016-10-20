<?php
/**
 * Created by PhpStorm.
 * User: Narek
 * Date: 10/19/2016
 * Time: 4:35 PM
 */

namespace App\Http\Controllers\API;
//use Illuminate\Support\Facades\Log;
use Log;
use Illuminate\Http\Request;


class ApiLogger
{
    public static function logInfo (Request $request){

        Log::info('User action:', ['ip' => $request->ip(), 'URL' => $request->path()]);
    }
}