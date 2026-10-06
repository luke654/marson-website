import fs from 'fs';

async function run() {
  const res = await fetch("https://raw.githubusercontent.com/luke654/marson-website/main/docs/feed.json");
  const data = await res.json();
  
  let rawList = [];
  if (data.feeds) {
    Object.values(data.feeds).forEach((feed: any) => {
      if (feed.data && feed.data.Immobile) {
        const immobili = Array.isArray(feed.data.Immobile) 
          ? feed.data.Immobile 
          : [feed.data.Immobile];
        rawList = [...rawList, ...immobili];
      }
    });
  } else if (Array.isArray(data)) {
    rawList = data;
  } else {
    rawList = data.immobili || data.properties || data.data || [];
  }
  
  const noDesc = rawList.filter(item => {
    let description = item.descrizione || item.description || "";
    if (item.Descrizioni?.Descrizione?.Testo?.["#text"]) {
      description = item.Descrizioni.Descrizione.Testo["#text"];
    }
    return !description || description.trim() === "";
  });
  
  console.log(`Trovati ${noDesc.length} immobili senza descrizione:`);
  noDesc.forEach(item => {
    const getText = (obj: any) => obj && typeof obj === 'object' && "#text" in obj ? obj["#text"] : obj;
    const id = item["@attributes"]?.IDImmobile || item.id || item.codice;
    const location = getText(item.Comune) || item.location || item.city || "Non specificata";
    const price = getText(item.Prezzo) || item.prezzo || item.price;
    console.log(`- ID: ${id} | Comune: ${location} | Prezzo: ${price}`);
  });
}

run();