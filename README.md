# prototype 1 - Smart Contract voor gewassen/akkerbouw insurance met een Oracle intergratie van MeteoVista B.V. developed on Ethereum

# Locatie van de Proof of Concept
    http://116.203.139.111:8080/

Drie belangerijke elementen & componenten zijn:

    • Truffle
    • SemanticUI + Web3 Library (De front-end)
    • Web3 Library, Ethereum-bridge, Oraclize, WEBAPI, Ganache GUI (De back-end)
    
Randvoorwaarden om het PoC op een local machine te runnen, open 3 terminals:

        $ cd/stage/poc1/oraclize-test
        $ cd/stage/poc1/oraclize-test/app
        $ cd/stage/poc1/ethereum-bridge/
        en
        $ node bridge -a 9 -H 127.0.0.1 -p 9545 --dev
 
  
# Truffle Framework
  Het Truffle Framework is de basis, deze applicatie compiled de contracten van Solidity naar de Bytecode. Dit Framework regelt ook         de migritatie en de testing van de contracts naar de onderliggende Blockchain.
        
# SemanticUI
  De front-end App die met SemanticUI is ontwikkeld (de Webdev server) communiceerd met het on-chain contract op De Blockchain.           Dit loopt via de browser van de eindgebruiker. Dit gebeurd door middel van een tussenpersoon, namelijk de javaScript Library WEB3.
        
  Met Web3 luister je ook naar de events, die je van je Smart Contract terug krijgt.
        
  Er bestaat namelijk een functie genaamd *executePayment* in het Smart Contract
  
    executePayment(address, amount, condition)
    
  deze wordt opgeroepen vanuit Web3 als je op de betaalknop drukt.
  
 # Crop Sure Contract + Ethereum-bridge
 
 als er vervolgens op de betaalknop wordt gedrukt, dan runt het de code vanuit het Smart Contract.
 Via de Ethereum-bridge, wordt er een real time koppeling gemaakt met het contract on-chain en de Ethereum-bridge on-chain contract. 
 Dit contract staat in verbinding met de Ethereum-bridge applicatie, die op zijn beurt weer in verbinding staat met Oraclize.
 
 Het Crop sure Contract staat in verbinding door de OraclizeAdressResolver hard te coden in het contract:
 
        // set smart contract address
        OAR = OraclizeAddrResolverI(0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475);
        
  Dit adress wordt gebruikt op de blockchain om writes/reads en contract calls te maken naar de Blockchain omgeving
 
  # De Oraclize Orakel interface
  
  Als er een claim door de eindgebruiker plaatsvind als men op de betaalknop drukt, wordt er een Oracle query geinitieerd door het     Contract en via het on-chain Oracle contract verstuurd via de Ethereum-bridge naar oraclize. Via de Oraclize interface wordt er de volgende query verstuurd naar de MeteoServer B.V. Wep-API:
  
    json(http://weerlive.nl/api/json-data-10min.php?key=23576abdeb&locatie=Amsterdam).liveweer.0.d0neerslag
  
  Als er een antwoord op de request van het Smart Contract komt, stuur het een antwoord op de request terug via een Event.
  Er zijn twee soorten events die er kunnen onstaant: 
  
        PaymentSucceeded
        PaymentFailed
        
  De event zorgt ervoor dat SemanticUI een pop-up laat zien op de pagina.
  Het contract checkt namelijk of de ingevulde conditie in het veld:
  
   *uitkeren bij* voldoet aan de hoeveelheid neerslag die het KNMI heeft gemeten in Amsterdam, die
   
   als de conditie waar is dan:
   
         PaymentSucceeded
         
   Vervolgens keert het Smart Contract de schade uitbetaling direct uit aan de gedupeerde verzekerde.
 
   als de conditie *NIET* waar is dan:
  
        PaymentFailed
        
   De conditie kan ook NIET waar zijn als het contract onvoldoende financiele middelen bezit, in de vorm van ETH.
   
   Als de conditie NIET waar is, wordt er door het Smart Contract ook geen schade uitgekeerd aan de claim indiener. De premie blijft eigendom van het contract en is niet meer uit te keren.
        
  
