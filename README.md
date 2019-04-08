# prototype 1 - Smart Contract voor gewassen/akkerbouw insurance met een Oracle intergratie van MeteoVista B.V. developed on Ethereum

Drie belangerijke elementen & componenten zijn:

    • Truffle
    • SemanticUI + Web3 Library (De front-end)
    • Web3 Library, Ethereum-bridge, Oraclize, WEBAPI, Ganache GUI (De back-end)
  
# Truffle Framework
  Het Truffle Framework is de basis, Deze applicatie compiled de contracten van Solidity naar de Bytecode. Dit Framework regelt ook         de migritatie en de testing van de contracts.
        
# SemanticUI
  De front-end App die met SemanticUI is ontwikkeld (de Webdev server) communiceerd met het on-chain contract op De Blockchain.           Dit loopt via de browser van de eindgebruiker. Dit gebeurd door middel van een tussenpersoon, namelijk de javaScript Library WEB3.
        
  Met Web3 luister je ook naar de events, die je van je Smart Contract terug krijgt.
        
  Er bestaat namelijk een functie genaamd *executePayment*
  
    executePayment(address, amount, condition)
    
  deze wordt gecalled vanuit Web3 als je op de betaalknop drukt.
  
 # Crop Sure Contract + Ethereum-bridge
 
 als er vervolgens op de betaalknop wordt gedrukt, dan runt het de code vanuit het Smart Contract.
 Via de Ethereum-bridge, wordt er een real time koppeling gemaakt met het contract on-chain en de Ethereum-bridge on-chain contract. 
 Dit contract staat in verbinding met de Ethereum-bridge applicatie, die op zijn beurt weer in verbinding staat met Oraclize. 
 
  # De Oraclize Orakel interface
  
  Als er een claim door de eindgebruiker plaatsvind als men op de betaalknop drukt, wordt er een Oracle query geinitieerd door het Contract en via het on-chain Oracle contract verstuurd via de Ethereum-bridge naar oraclize. Via de Oraclize interface wordt er de volgende query verstuurd naar de MeteoServer B.V. Wep-API:
  
    json(http://weerlive.nl/api/json-data-10min.php?key=23576abdeb&locatie=Amsterdam).liveweer.0.d0neerslag
        
  
