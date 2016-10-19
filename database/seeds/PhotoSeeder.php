<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class PhotoSeeder extends Seeder
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
            DB::table('photos')->insert([
                'name' => "image ". $index,
                'link' => $faker->url,
                'photo_album_id' => $faker->biasedNumberBetween(1, 10),

            ]);
        }
    }
}
