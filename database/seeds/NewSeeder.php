<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class NewSeeder extends Seeder
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
            DB::table('news')->insert([
                'title' => $faker->sentence(),
                'description' => $faker->text,
                'image' => $faker->imageUrl(),
                'link' => $faker->url,
                'date' => $faker->date()
            ]);
        }

    }
}
