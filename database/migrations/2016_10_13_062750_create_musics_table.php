<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMusicsTable extends Migration
{
    public function up()
    {
        //
        Schema::create('musics', function (Blueprint $table) {
            $table->increments('id');
            $table->string('track');
            $table->text('lyrics');
            $table->string('link');
            $table->string('performer');
            $table->string('music_by');
            $table->string('lyrics_by');
            $table->integer('music_album_id')->unsigned();
            $table->foreign('music_album_id')
                ->references('id')->on('music_albums')
                ->onDelete('cascade');
            $table->smallInteger('is_published');
            $table->smallInteger('is_favorite');
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
        Schema::drop('musics');
    }
}
