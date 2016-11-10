<?php
/**
 * Created by PhpStorm.
 * User: narek
 * Date: 11/9/16
 * Time: 4:26 PM
 */

namespace kohar\SoundCloudeApi;
use GuzzleHttp\Client;


class SoundCloudeClient
{
    protected  $client;
    protected $clientID;
    function __construct() {
        $this->clientID = "69b6a6bc4f7d483fd21b170137a9cd51";
        $this->client = new Client([
            // Base URI is used with relative requests
            'base_uri' => 'http://api.soundcloud.com',
            // You can set any number of default request options.
            'timeout'  => 2.0,
        ]);
    }

    function GetTrackLink($id)
    {
        $trackinforURL = "http://api.soundcloud.com/tracks/$id.json?client_id=69b6a6bc4f7d483fd21b170137a9cd51";
        return json_decode($this->getPageData($trackinforURL));
    }
    function getPageData($url, $follow = TRUE, $cookie = FALSE)
    {
        $cookie_file_path = 'cookies.txt';
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, $follow);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_FILETIME, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST,  2);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 6.1; it; rv:2.0b4) Gecko/20100818');
        curl_setopt($ch, CURLOPT_REFERER, $url);
        if($cookie)
            curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie_file_path);

        curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie_file_path);
        $data = curl_exec($ch);
        curl_close($ch);

        return $data;
    }


    function getStreamUrlFromId($id)
    {
        $track = $this->GetTrackLink($id);
        return $track->stream_url."?client_id=".$this->clientID;
    }

    /**
     * get respons form http request
     * @param  string
     * @return string
     */
    function resolvUrl($url){
        return  $this->client->get('/resolve?url='.$url.'&client_id='.$this->clientID)->getBody();
    }

    function getStreamUrlFromURL($url){
        $data = json_decode($this->resolvUrl($url));
        return $data->stream_url.'?client_id='.$this->clientID;
    }
    /**
     * get duration
     * @param  string
     * @return string
     */
    function getDurationFromURL($url){
        $data = json_decode($this->resolvUrl($url));
//        return $this->resolveDuration($data->duration);
        return $data->duration;
    }

    protected function resolveDuration($ms){
        if($ms > 3600000)
            return '>1h';
        $seconds = floor($ms / 1000);

        $secSu = $seconds % 60;
        $minut = floor($seconds / 60);
        return $minut.':'.($secSu < 10 ? '0'.$secSu : $secSu);
    }


}