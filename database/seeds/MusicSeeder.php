<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class MusicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $faker = Faker::create();
        foreach (range(1,20) as $index) {
            DB::table('musics')->insert(array(
                'track' => "track ". $index,
                'lyrics' => $faker->text,
                'link' => $faker->url,
                'performer' => $faker->name,
                'music_by' => $faker->name,
                'lyrics_by' => $faker->name,
                'music_album_id' => $faker->biasedNumberBetween(1, 10),
                'is_published' => $faker->biasedNumberBetween(0, 1),
                'is_favorite' => $faker->biasedNumberBetween(0, 1),
            ));
        }


    }
}

