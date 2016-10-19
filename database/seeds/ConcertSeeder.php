<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Faker\Factory as Faker;

class ConcertSeeder extends Seeder
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
            DB::table('concerts')->insert([
                'country' => $faker->country,
                'city' => $faker->city,
                'place' => $faker->address,
                'description' => $faker->text(),
                'date' => $faker->date()
            ]);
        }

    }
}
