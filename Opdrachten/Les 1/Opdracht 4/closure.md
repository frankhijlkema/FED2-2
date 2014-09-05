Een closure is een functie in een functie die toegang heeft tot de variabelen in de buitenste functie.
De closure heeft drie scopes: het heeft toegang tot zijn eigen scope (variabelen die zijn gedefinieerd tussen de accolades), heeft zij toegang tot variabelen de buitenste functie, en heeft zij toegang tot de globale variabelen.

Ook heeft een closure toegang tot de parameters van de buitenste functie.


// Voorbeeld
```
function persoonsNaam(voornaam, achternaam)
{ 
    var intro = "Je naam is ";

    return function()
    { 
        return console.log(intro + voornaam + " " + achternaam); 
    }
} 

persoonsNaam("Roy", "Peters");