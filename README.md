# [moneybag.markets](https://moneybag.markets)

## About

[Tap Tap Trillionaire](https://toucharcade.com/games/tap-tap-trillionaire-money) was one of my favorite games a child.
It brought a new concept to idle clickers that I hadn't seen before: a market to buy and sell investments.
As one of my first projects in Svelte, I decided to make my own game inspired by TTT that incorporated a favorite pastime of many adults: gambling.

The game is fully client-side and can run offline, so I also used it as an opportunity to learn about service workers.
You can add the game to your phone's homescreen through the usual PWA installation flow.

The original goal was to add the site to [BoredButton](https://boredbutton.com), where one of my other sites, [told-you.so](https://told-you.so), is thriving.
Unfortunately, the webmaster has yet to add [moneybag.markets](https://moneybag.markets).

## AI Disclosure

AI was used to create the companies, the flavor text, and set the price/reward tables.
AI was also used to generate the headlines.

## Math

It turns out there's a lot of math that goes into balancing an idle game.
I was really tired by the time I got to that part of development, so I skimmed, but did not implement, this three-part series by Anthony Pecorella of Kongregate on the math behind idle games ([1](https://blog.kongregate.com/the-math-of-idle-games-part-i/) [2](https://blog.kongregate.com/the-math-of-idle-games-part-ii/) [3](https://blog.kongregate.com/the-math-of-idle-games-part-iii/)).
In the future, I'd like to rebalance the game with the information in these papers, since the early generators become useless and the final generators all unlock in quick succession.

## Manual (available in-game by clicking the "About" button)

Welcome to moneybag.markets. In this world, companies offer public fractional ownership through Moneybags, not stocks.

These moneybags can be bought and sold on the market, though riskier investors often opt to open these moneybags and take whatever's inside.

Your job is to closely monitor the market and get rich by any means necessary.

### Buying and Selling

At any point during the game, you may buy or sell moneybags for any companies you've unlocked if you have enough Coins.

Buying and selling happens at the current market price, indicated by the value above each graph. You can also see recent historical high and low values under each graph.

Each company has its own volatility, market update cadence, and value range. YourNotebook at the bottom keeps track of the highest and lowest values you've traded each company's moneybag for.

### Opening Moneybags

After purchasing a moneybag, you may choose to open it. Opening a moneybag removes it from your portfolio and makes it unavailable to be sold back to the market.

Each moneybag has its own reward table, and certain moneybags have ultra-rare powerup rewards. Your Notebook tracks unlocked powerups.

### Unlocking Companies

Unlocking companies costs Coins. Unlocking a company requires paying a one-time fee for lifetime access to the company's market.

Companies may be unlocked in any order.

### Target Demographics

Each company is categorized as Goods, Service, or Establishment.

Each company also caters to one or more demographics. The full list of demographics is Young Adults, Middle-Aged, Retired, Lower-Class, Middle-Class, and Upper-Class.

### News Ticker

News headlines are always available at the top of the screen. Pay attention to these headlines, since they affect the market.

Every so often, Breaking News is added to the ticker. The newest headline is always bolded to distinguish it from older news.

Headlines can affect individual companies, all companies in a demographic, or all companies of a specific category.
