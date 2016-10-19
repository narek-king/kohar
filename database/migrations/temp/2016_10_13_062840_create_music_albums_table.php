<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMusicAlbumsTable extends Migration
{
    public function up()
    {
        //
        Schema::create('music_albums', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('cover');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::drop('music_albums');
    }
}
