export interface Office {
  city: string;
  slug: string;
  phone: string;
  address: string;
  images: string[];
  reviewUrl: string;
  placeId: string;
  seoText: {
    title: string;
    description: string;
  };
}

export const offices: Office[] = [
  {
    city: "Legnano",
    slug: "legnano",
    phone: "0331 455258",
    address: "Via Sempione, 126, 20025 Legnano MI",
    images: [
      "https://vibe.filesafe.space/1775806180627333208/attachments/ba96b5df-f6f4-430b-af63-3378993f73c3.png",
      "https://vibe.filesafe.space/1775806180627333208/attachments/db34bcc1-6c6a-4103-a224-24e676a6679f.png",
      "https://vibe.filesafe.space/1775806180627333208/attachments/1e40b876-7a3b-4b06-bac8-f2a8ac5c4fa7.png",
      "https://vibe.filesafe.space/1775806180627333208/attachments/fa71d8de-646a-4de2-a94f-890c86744472.png",
      "https://vibe.filesafe.space/1775806180627333208/attachments/1a4bbc4d-14f7-4d84-aa66-c7173f543156.png"
    ],
    reviewUrl: "https://www.google.com/maps/place/IMMOBILIARE+MARSON+ufficio+di+LEGNANO/@45.5876277,8.905953,15z/data=!4m12!1m2!2m1!1smarson+immobiliare+legnano!3m8!1s0x47868da3d61b814b:0xa01e65643d2b7aeb!8m2!3d45.5983192!4d8.920568!9m1!1b1!15sChptYXJzb24gaW1tb2JpbGlhcmUgbGVnbmFub5IBEnJlYWxfZXN0YXRlX2FnZW50c-ABAA!16s%2Fg%2F1tfvg2g7?entry=ttu&g_ep=EgoyMDI2MDUwMi4wIKXMDSoASAFQAw%3D%3D",
    placeId: "ChIJu7S-vIu6mUARX3F2IAHQv6E",
    seoText: {
      title: "Vendere e affittare casa a Legnano",
      description: "Legnano è un mercato immobiliare dinamico. Se stai cercando di vendere casa a Legnano, affidarsi a un'agenzia radicata sul territorio come Marson Immobiliare ti garantisce una valutazione precisa e tempi di vendita ottimizzati."
    }
  },
  {
    city: "Canegrate",
    slug: "canegrate",
    phone: "0331 407358",
    address: "Via Roma 26, 20010 Canegrate MI",
    images: [
      "https://vibe.filesafe.space/1775806180627333208/attachments/f1278c9b-897a-45ac-b444-fc8d45255c31.png",
      "https://vibe.filesafe.space/1775806180627333208/attachments/e8cbc368-e107-4f42-9923-e338077185aa.png",
      "https://vibe.filesafe.space/1775806180627333208/attachments/49f05795-e4df-4d9d-97ac-23cefe5e83b7.png",
      "https://vibe.filesafe.space/1775806180627333208/attachments/e16d2e94-2683-49fc-aec6-f074cf03e4ac.png"
    ],
    reviewUrl: "https://www.google.com/maps/search/?api=1&query=Marson%20Immobiliare%20Canegrate&query_place_id=ChIJT9S_Pkh-rCERP58_Q-SH6sI",
    placeId: "ChIJT9S_Pkh-rCERP58_Q-SH6sI",
    seoText: {
      title: "Vendere e affittare casa a Canegrate",
      description: "Il mercato immobiliare di Canegrate offre ottime opportunità. Vendere casa a Canegrate con Marson Immobiliare significa affidarsi a professionisti che conoscono ogni via del paese."
    }
  },
  {
    city: "San Giorgio su Legnano",
    slug: "san-giorgio-su-legnano",
    phone: "0331 410300",
    address: "Via Roma, 53, 20034 San Giorgio su Legnano MI",
    images: [
      "https://vibe.filesafe.space/1775806180627333208/attachments/85d2e062-cea2-48f1-9d54-1cfea863bf05.png",
      "https://vibe.filesafe.space/1775806180627333208/attachments/be384722-e09c-4282-bb12-cb7262470af1.png",
      "https://vibe.filesafe.space/1775806180627333208/attachments/6ae23806-9399-4a0f-b946-dc66ebb8c429.png",
      "https://vibe.filesafe.space/1775806180627333208/attachments/2454055a-71cb-4391-ba8e-da1e39db0038.png"
    ],
    reviewUrl: "https://www.google.com/maps/search/?api=1&query=Marson%20Immobiliare%20San%20Giorgio%20su%20Legnano&query_place_id=ChIJX23KrE8EBRMLX23KrE8EBBM",
    placeId: "ChIJX23KrE8EBRMLX23KrE8EBBM",
    seoText: {
      title: "Vendere e affittare casa a San Giorgio su Legnano",
      description: "San Giorgio su Legnano è una zona molto richiesta per la sua tranquillità e i servizi. Scopri come vendere casa a San Giorgio su Legnano al miglior prezzo con i nostri consulenti locali."
    }
  },
  {
    city: "Villa Cortese",
    slug: "villa-cortese",
    phone: "0331 433303",
    address: "Piazza Vittoria, 10, 20020 Villa Cortese MI",
    images: [
      "https://vibe.filesafe.space/1775806180627333208/attachments/c8c041c6-78a5-495f-8769-cbce4a26be60.png",
      "https://vibe.filesafe.space/1775806180627333208/attachments/6bf216f4-4f12-4016-8c95-8556f0393bcf.png",
      "https://vibe.filesafe.space/1775806180627333208/attachments/d952788b-caba-4dd8-9308-22f71f9f65e7.png",
      "https://vibe.filesafe.space/1775806180627333208/attachments/7f3f5a75-78fd-4c16-8d70-6151948dae3b.png"
    ],
    reviewUrl: "https://www.google.com/maps/search/?api=1&query=Marson%20Immobiliare%20Villa%20Cortese&query_place_id=ChIJLvEBM_W_6mURCWYVI37DJkI",
    placeId: "ChIJLvEBM_W_6mURCWYVI37DJkI",
    seoText: {
      title: "Vendere e affittare casa a Villa Cortese",
      description: "Villa Cortese offre un ambiente residenziale ideale per le famiglie. Se devi vendere casa a Villa Cortese, la nostra sede in Piazza Vittoria è il tuo punto di riferimento."
    }
  },
  {
    city: "Busto Garolfo",
    slug: "busto-garolfo",
    phone: "0331 122 65 46",
    address: "Via San Remigio, 2, 20020 Busto Garolfo MI",
    images: [
      "https://vibe.filesafe.space/1775806180627333208/attachments/51082d02-fa82-409e-ace3-78de0f7eb3d9.png",
      "https://vibe.filesafe.space/1775806180627333208/attachments/e9451dc0-2fd2-4982-9e7c-9546b06c7520.png",
      "https://vibe.filesafe.space/1775806180627333208/attachments/f80f795c-38f9-454d-b4d0-5681e584a25b.png",
      "https://vibe.filesafe.space/1775806180627333208/attachments/529bb98e-25d9-461b-a70c-93a033905260.png"
    ],
    reviewUrl: "https://www.google.com/maps/search/?api=1&query=Marson%20Immobiliare%20Busto%20Garolfo&query_place_id=ChIJfcEBMzKzd5URCVcSKzoys3c",
    placeId: "ChIJfcEBMzKzd5URCVcSKzoys3c",
    seoText: {
      title: "Vendere e affittare casa a Busto Garolfo",
      description: "Conoscere le particolarità di Busto Garolfo è fondamentale per vendere bene. Marson Immobiliare ti supporta in ogni fase della compravendita a Busto Garolfo."
    }
  },
  {
    city: "San Vittore Olona",
    slug: "san-vittore-olona",
    phone: "335 133 3080",
    address: "Corso Sempione, 186, 20028 San Vittore Olona MI",
    images: [
      "https://vibe.filesafe.space/1775806180627333208/attachments/83514b7b-4ef0-4e61-ac44-15692ad361d9.png",
      "https://vibe.filesafe.space/1775806180627333208/attachments/18a82d5f-54c8-4afa-b15b-c459f3871d13.png",
      "https://vibe.filesafe.space/1775806180627333208/attachments/9660f041-ffc2-4b4d-9056-880045ee504c.png",
      "https://vibe.filesafe.space/1775806180627333208/attachments/faccc97b-627c-42c4-a9b9-cdfca9c9d23f.png",
      "https://vibe.filesafe.space/1775806180627333208/attachments/bc2d70ba-8003-4401-92b5-781354e62c53.png"
    ],
    reviewUrl: "https://www.google.com/maps/search/?api=1&query=Marson%20Immobiliare%20San%20Vittore%20Olona&query_place_id=ChIJvHEBM-O-JXvHEBM-JXvHEBM",
    placeId: "ChIJvHEBM-O-JXvHEBM-JXvHEBM",
    seoText: {
      title: "Vendere e affittare casa a San Vittore Olona",
      description: "Posizione strategica e ottimi collegamenti. Vendere casa a San Vittore Olona è più semplice affidandosi alla nostra esperienza pluridecennale sul territorio."
    }
  }
];