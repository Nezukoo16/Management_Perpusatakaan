<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BookSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('books')->insert([
            [
                'title' => 'Clean Code',
                'category_id' => 1,
                'author' => 'Robert C. Martin',
                'publisher' => 'Prentice Hall',
                'publication_year' => '2008',
                'stock' => 10,
            ],
            [
                'title' => 'The Pragmatic Programmer',
                'category_id' => 1,
                'author' => 'Andrew Hunt & David Thomas',
                'publisher' => 'Addison-Wesley',
                'publication_year' => '1999',
                'stock' => 8,
            ],
            [
                'title' => 'Atomic Habits',
                'category_id' => 3,
                'author' => 'James Clear',
                'publisher' => 'Penguin Random House',
                'publication_year' => '2018',
                'stock' => 12,
            ],
            [
                'title' => 'Brief Answers to the Big Questions',
                'category_id' => 2,
                'author' => 'Stephen Hawking',
                'publisher' => 'Bantam',
                'publication_year' => '2018',
                'stock' => 5,
            ],
        ]);
    }
}
