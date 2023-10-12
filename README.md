# shibot

Track a ship with a simple Telegram interface. This consists of two node scripts, one that tracks a ship, another one running a very simple Telegram bot that answers to the command `\donde`, *where* is the ship.

## Installation

Not available, for the time being, from any module repository. So you will need to clone this

```shell
# GitHub official CLI
gh repo clone JJ/shibot

# vanilla git
git clone git@github.com:JJ/shibot.git
```

Then

```shell
cd shibot
npm ci
```

To install required dependencies. This will help you develop, but keep on reading for actually running it.

## Running the scripts

We are using 3 APIs here, you'll have to obtain keys for all of them

* [Geoapify](https://www.geoapify.com/geocoding-api)
* [Telegram](https://core.telegram.org/api)
* [AISStream](https://aisstream.io/documentation)

Save them in a `.env` file (remember, *never* add this to your repo, even if it's private; it's in the `.gitignore` file, so unless you do it on purpose, you're safe):

```shell
BRBSTR_TOKEN=<Telegram bot token issued by The BotFather>
GEOAPIFY_API_KEY=<GeoAPIfy API key>
AISSTREAM_API_KEY=<AISStream API key>
```

Check [`dot.env`](dot.env) as an example.

## LICENSE

(c) JJ Merelo, 2023

Released under the [GPL v3.0 license](LICENSE).
