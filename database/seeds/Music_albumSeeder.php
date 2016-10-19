<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class Music_albumSeeder extends Seeder
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
            DB::table('music_albums')->insert([
                'name' => 'All Time Armenian Favorites'. $index,
                'cover' => $faker->image()
            ]);
        }


    }
}
