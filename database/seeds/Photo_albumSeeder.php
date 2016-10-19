<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class Photo_albumSeeder extends Seeder
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
        foreach (range(1,10) as $index) {
            DB::table('photo_albums')->insert([
                'name' => 'Visit to '. $faker->country,
                'cover' => $faker->imageUrl()
            ]);
        }
    }
}
