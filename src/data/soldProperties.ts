export interface SoldProperty {
  id: string;
  /** Percorso in /public oppure URL */
  image: string;
  comune?: string;
  /** Via e civico, se noti */
  address?: string;
  /** Data della vendita in formato ISO, se nota (non viene mostrata) */
  soldDate?: string;
}

/**
 * Immobili venduti mostrati in homepage (hero): foto e indirizzi mandati da Ivan
 * Marson su WhatsApp (28/10/2026) e post della pagina Facebook. Si mostrano solo
 * immobili con indirizzo. Per aggiungerne uno basta inserire un nuovo oggetto
 * nell'array, con la foto in public/venduti/.
 * Se l'array è vuoto il blocco non viene mostrato.
 */
export const soldProperties: SoldProperty[] = [
  // Da Ivan Marson (WhatsApp, 28/10/2026), alternando i comuni
  { id: "piero-dell-acqua-2", image: "/venduti/sanvittore-piero-dell-acqua-2.jpg", comune: "San Vittore Olona", address: "Via Piero dell'Acqua 2" },
  { id: "piazza-italia-28", image: "/venduti/nerviano-piazza-italia-28.jpg", comune: "Nerviano", address: "Piazza Italia 28" },
  { id: "flora-4", image: "/venduti/legnano-flora-4.jpg", comune: "Legnano", address: "Via Flora 4" },
  { id: "sempione-19", image: "/venduti/sanvittore-sempione-19.jpg", comune: "San Vittore Olona", address: "Via Sempione 19" },
  { id: "brisa-10", image: "/venduti/parabiago-brisa-10.jpg", comune: "Parabiago", address: "Via Brisa 10" },
  { id: "unita-italia-1", image: "/venduti/canegrate-unita-italia-1.jpg", comune: "Canegrate", address: "Piazza Unità d'Italia 1" },
  { id: "vittorio-veneto-13", image: "/venduti/sanvittore-vittorio-veneto-13.jpg", comune: "San Vittore Olona", address: "Via Vittorio Veneto 13" },
  { id: "rovereto-9", image: "/venduti/sangiorgio-rovereto-9.jpg", comune: "San Giorgio su Legnano", address: "Via Rovereto 9" },
  { id: "manzoni-89", image: "/venduti/sanvittore-manzoni-89.jpg", comune: "San Vittore Olona", address: "Via Manzoni 89" },
  { id: "xxv-aprile-1", image: "/venduti/cerro-xxv-aprile-1.jpg", comune: "Cerro Maggiore", address: "Via XXV Aprile 1" },
  { id: "alfieri-25", image: "/venduti/sanvittore-alfieri-25.jpg", comune: "San Vittore Olona", address: "Via Alfieri 25" },
  { id: "legnano-manzoni-63", image: "/venduti/legnano-manzoni-63.jpg", comune: "Legnano", address: "Via Alessandro Manzoni 63" },
  { id: "montegrappa-31", image: "/venduti/sanvittore-montegrappa-31.jpg", comune: "San Vittore Olona", address: "Via Montegrappa 31" },
  { id: "leopardi-10", image: "/venduti/sanvittore-leopardi-10.jpg", comune: "San Vittore Olona", address: "Via Leopardi 10" },
  { id: "san-francesco-39", image: "/venduti/sanvittore-san-francesco-39.jpg", comune: "San Vittore Olona", address: "Via San Francesco d'Assisi 39" },
  { id: "divisione-sforzesca-4", image: "/venduti/sanvittore-divisione-sforzesca-4.jpg", comune: "San Vittore Olona", address: "Via Divisione Sforzesca 4" },
  // Post del 2023 con indirizzo
  { id: "arborio-mella-47", image: "/venduti/sangiorgio-arborio-mella-47.jpg", comune: "San Giorgio su Legnano", address: "Via Arborio Mella 47", soldDate: "2023-11-29" },
  { id: "dannunzio-12", image: "/venduti/canegrate-dannunzio-12.jpg", comune: "Canegrate", address: "Via D'Annunzio 12", soldDate: "2023-11-16" },
  { id: "regina-margherita-73", image: "/venduti/cerro-regina-margherita-73.jpg", comune: "Cerro Maggiore", address: "Via Regina Margherita 73", soldDate: "2023-10-19" },
  { id: "cesare-battisti-90", image: "/venduti/sanvittore-cesare-battisti-90.jpg", comune: "San Vittore Olona", address: "Via Cesare Battisti 90", soldDate: "2023-08-01" },
];
