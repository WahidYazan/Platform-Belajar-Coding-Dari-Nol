import type { Tutorial } from "../types"

export const phpComposer: Tutorial = {
  slug: "php-composer",
  title: "PHP: Composer & Dependency Management",
  description:
    "Pelajari cara menggunakan Composer: install package, autoloading, PSR-4, dan mengelola dependency PHP.",
  category: "PHP",
  level: "Pemula",
  minutes: 15,
  date: "2026-08-17",
  content: [
    {
      type: "p",
      text: "Composer adalah package manager untuk PHP (seperti NPM untuk JavaScript). Dengan Composer, kamu bisa install ribuan library yang sudah dibuat komunitas dan mengelola dependency projectmu.",
    },
    { type: "h2", text: "Instalasi Composer" },
    {
      type: "code",
      lang: "bash",
      filename: "terminal",
      code: `# Ubuntu/Debian
sudo apt update
sudo apt install composer

# Mac
brew install composer

# Windows
# Download installer dari getcomposer.org

# Cek instalasi
composer --version
# Composer version 2.x

# Update Composer
composer self-update`,
    },
    { type: "h2", text: "Memulai Project dengan Composer" },
    {
      type: "code",
      lang: "bash",
      filename: "terminal",
      code: `# Init project baru
mkdir my-project && cd my-project
composer init

# Atau install framework langsung
composer create-project laravel/laravel my-app
composer create-project symfony/skeleton my-symfony
composer create-project phpmailer/phpmailer my-mailer

# Install package
composer require monolog/monolog       # logging
composer require guzzlehttp/guzzle    # HTTP client
composer require phpmailer/phpmailer   # email

# Install package development only
composer require --dev phpunit/phpunit
composer require --dev friendsofphp/php-cs-fixer

# Update semua package
composer update

# Hapus package
composer remove monolog/monolog`,
    },
    { type: "h2", text: "Autoloading & PSR-4" },
    {
      type: "code",
      lang: "php",
      filename: "composer.json",
      code: `{
    "name": "budi/my-app",
    "description": "My awesome PHP app",
    "type": "project",
    "require": {
        "php": ">=8.1",
        "monolog/monolog": "^3.0",
        "guzzlehttp/guzzle": "^7.0"
    },
    "require-dev": {
        "phpunit/phpunit": "^10.0",
        "friendsofphp/php-cs-fixer": "^3.0"
    },
    "autoload": {
        "psr-4": {
            "App\\\\": "src/"
        }
    },
    "autoload-dev": {
        "psr-4": {
            "App\\\\Tests\\\\": "tests/"
        }
    },
    "scripts": {
        "test": "phpunit",
        "format": "php-cs-fixer fix src/"
    }
}`,
    },
    {
      type: "code",
      lang: "php",
      filename: "index.php",
      code: `<?php
// Composer otomatis load semua class (autoloading)
require __DIR__ . "/vendor/autoload.php";

// Package dari Composer langsung bisa dipakai!
use Monolog\\Logger;
use Monolog\\Handler\\StreamHandler;

$logger = new Logger("app");
$logger->pushHandler(new StreamHandler("app.log", Logger::INFO));
$logger->info("Aplikasi dimulai!");

// Buat class sendiri di src/
// src/User.php namespace App;
class User {
    public function __construct(public string $nama) {}
}

// Di file lain, import pakai namespace
// use App\\User;
// $user = new User("Budi");

// Autoload class sendiri otomatis berdasarkan PSR-4
// Folder src/ → namespace App\\
// src/User.php → App\\User
// src/Models/Post.php → App\\Models\\Post
?>`,
    },
    { type: "h2", text: "Lock File & Reproducibility" },
    {
      type: "code",
      lang: "bash",
      filename: "terminal",
      code: `# composer.lock = mengunci versi persis semua package
# SELALU commit composer.lock ke Git!

# Install dari lock file (persis sama dengan yang lain)
composer install

# Update lock file
composer update

# Cek outdated package
composer outdated

# Cek dependency tree
composer depends monolog/monolog

# Optimize autoloader (untuk produksi)
composer dump-autoload --optimize

# Script di composer.json
composer run test
composer run format`,
    },
    {
      type: "callout",
      title: "Tips Composer",
      tone: "tip",
      text: "Selalu commit composer.lock ke Git (bukan vendor/). composer install untuk install dari lock, composer update untuk update versi. Untuk produksi, jalankan composer install --no-dev untuk skip development dependency.",
    },
  ],
}
