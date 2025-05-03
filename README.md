# atr
Autonomi Transaction Reporter

The Autonomi Transaction Reporter aims to help solve the tricky problem of tax reporting for Autonomi Network Token (ANT) transactions, to assist those who pay or earn tokens to use [Autonomi](https://autonomi.com).

## The problem

Using Autonomi for anything other than Downloads (which will always be free), consumes two cryptocurrency tokens: ANT and Arbitrum Etherium. In addition, node operators, earn ANT tokens in exchange for enabling data to be written to the network, and for the next few years, also just for running nodes through emissions.

In many jurisdictions, included the United States where I reside, all these transactions are reportable as potentially taxable events (gains and losses). Managing large volumes of transactions is time consuming by hand. There are other tools that exist, which unfortunately charge in the hundreds of dollars/year for more than a modest number of transactions.

## The approach

The simplest use case, a U.S. node operator who doesn't spend or transfer their earnings, has to record all their ANT earnings priced on the day they are received as regular income (just like mining other coins). This requires finding the transaction and it's associated pricing information.

Users who upload data to the network, have to report the difference in price of the ANT when it was spent vs it's price when earned/bought.  In addition, using ANT requires another coin, Arbitrum Ethereum, which has it's own reporting of value between earned/bought and sold/spent.

ATR accepts a list of wallets as input, and then pulls the transaction information from the blockchain.  For the ANT token, there are only a few types of transactions, and those can be detected and categorized automatically to many extents.  

This information is then displayed to the user for them to confirm or edit special/unknown transactions. For example, you might have different pricing information for a private transaction that you need to provide.  Another example is if the funds you transfer into a monitored wallet have various purchase dates/prices that need to be tracked.

Finally, once all the transactions are recorded, ATR will build a resolution. Beginning in 2026, the US will require all transactions to be First-In/First-Out (FIFO), which means when you spend or dispose of assets, the difference in price between the oldest asset and the outgoing asset is what is recorded. This requires tracking all the fractional transactions between accounts.

There are settlement choices available in other jurisdictions, Highest-In/First-Out (HIFO) or managing individual transactions that I may be able to address directly in the future. At the least, I'll be output the transaction list in a way that it can be handed off to an accountant or tax attorney to resolve.

The final output are the tax forms needed to file your taxes. These will be provided as printable documents (.pdf) and computer importable (.csv). It's also advisable to download the completed transaction/resolution database to be importable for the next tax year.

## Deployment

The application will be a Docker container that you can run in your own environment (in which case you have to provide your own blockchain API keys) or that you can deploy in the cloud for an inexpensive cost (aiming for $5/$10).

The benchmark goal is that a user can import the results into Intuit TurboTax (or other tax software as time and money allows). A second goal is providing the report in a format that a tax/accounting professional can make rapid use of the results.

## Activity

There are currently other repos with spikes as I'm building out the features.  I started with a Python backend, which can take in a wallet address and then collect all the relevant transactions from the blockchain and then collect pricing information for each event.  I'm currently learning [Svelte](https://svelte.dev) to power the user interface, so there will not be much to show right away, but since I need Javascript for the frontend, I'm considering rewriting the Python backend in NodeJS and only having one stack to maintain.
