<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class VideoSeeder extends Seeder
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
            DB::table('videos')->insert([
                'name' => "video ". $index,
                'link' => $faker->url,
                'performer' => $faker->name,
                'music_by' => $faker->name,
                'lyrics_by' => $faker->name,
                'is_published' => $faker->biasedNumberBetween(0, 1),
            ]);
        }

    }
}
