export const priceHistoryData: Record<string, { date: string; price: number; volume: number }[]> = {
  "Nala Logistics": [
    { date: "Sep", price: 12.0, volume: 320 }, { date: "Oct", price: 12.8, volume: 410 },
    { date: "Nov", price: 13.2, volume: 380 }, { date: "Dec", price: 13.9, volume: 520 },
    { date: "Jan", price: 14.5, volume: 600 }, { date: "Feb", price: 15.0, volume: 480 },
  ],
  "Mombasa Farms": [
    { date: "Sep", price: 17.5, volume: 180 }, { date: "Oct", price: 18.0, volume: 210 },
    { date: "Nov", price: 18.8, volume: 160 }, { date: "Dec", price: 19.2, volume: 240 },
    { date: "Jan", price: 19.8, volume: 280 }, { date: "Feb", price: 20.0, volume: 220 },
  ],
  "TechHub Lagos": [
    { date: "Sep", price: 14.0, volume: 800 }, { date: "Oct", price: 15.5, volume: 920 },
    { date: "Nov", price: 16.4, volume: 1100 }, { date: "Dec", price: 17.8, volume: 1300 },
    { date: "Jan", price: 19.0, volume: 1500 }, { date: "Feb", price: 20.0, volume: 1200 },
  ],
  "Zanzibar Tours": [
    { date: "Sep", price: 10.5, volume: 200 }, { date: "Oct", price: 11.0, volume: 250 },
    { date: "Nov", price: 11.2, volume: 190 }, { date: "Dec", price: 11.8, volume: 310 },
    { date: "Jan", price: 12.0, volume: 350 }, { date: "Feb", price: 12.0, volume: 280 },
  ],
  "Cape Solar": [
    { date: "Sep", price: 22.0, volume: 400 }, { date: "Oct", price: 22.5, volume: 450 },
    { date: "Nov", price: 23.2, volume: 380 }, { date: "Dec", price: 24.0, volume: 520 },
    { date: "Jan", price: 24.5, volume: 600 }, { date: "Feb", price: 25.0, volume: 550 },
  ],
  "Accra Fintech": [
    { date: "Sep", price: 22.0, volume: 350 }, { date: "Oct", price: 24.0, volume: 420 },
    { date: "Nov", price: 25.5, volume: 500 }, { date: "Dec", price: 27.0, volume: 650 },
    { date: "Jan", price: 28.5, volume: 780 }, { date: "Feb", price: 30.0, volume: 700 },
  ],
};

export const orderBookData: Record<string, { bids: { price: number; qty: number }[]; asks: { price: number; qty: number }[] }> = {
  "Nala Logistics": {
    bids: [
      { price: 14.90, qty: 45 }, { price: 14.80, qty: 80 }, { price: 14.70, qty: 120 },
      { price: 14.50, qty: 65 }, { price: 14.30, qty: 30 },
    ],
    asks: [
      { price: 15.10, qty: 50 }, { price: 15.20, qty: 75 }, { price: 15.40, qty: 110 },
      { price: 15.60, qty: 40 }, { price: 15.80, qty: 25 },
    ],
  },
  "Mombasa Farms": {
    bids: [
      { price: 19.90, qty: 30 }, { price: 19.80, qty: 55 }, { price: 19.60, qty: 90 },
      { price: 19.40, qty: 45 }, { price: 19.20, qty: 20 },
    ],
    asks: [
      { price: 20.10, qty: 35 }, { price: 20.30, qty: 60 }, { price: 20.50, qty: 80 },
      { price: 20.80, qty: 25 }, { price: 21.00, qty: 15 },
    ],
  },
  "TechHub Lagos": {
    bids: [
      { price: 19.90, qty: 100 }, { price: 19.70, qty: 150 }, { price: 19.50, qty: 200 },
      { price: 19.20, qty: 120 }, { price: 19.00, qty: 80 },
    ],
    asks: [
      { price: 20.10, qty: 90 }, { price: 20.30, qty: 130 }, { price: 20.60, qty: 170 },
      { price: 20.80, qty: 60 }, { price: 21.00, qty: 40 },
    ],
  },
  "Zanzibar Tours": {
    bids: [
      { price: 11.90, qty: 40 }, { price: 11.80, qty: 65 }, { price: 11.70, qty: 85 },
      { price: 11.50, qty: 30 }, { price: 11.30, qty: 20 },
    ],
    asks: [
      { price: 12.10, qty: 45 }, { price: 12.20, qty: 70 }, { price: 12.40, qty: 95 },
      { price: 12.60, qty: 35 }, { price: 12.80, qty: 15 },
    ],
  },
  "Cape Solar": {
    bids: [
      { price: 24.90, qty: 55 }, { price: 24.70, qty: 80 }, { price: 24.50, qty: 110 },
      { price: 24.20, qty: 50 }, { price: 24.00, qty: 30 },
    ],
    asks: [
      { price: 25.10, qty: 60 }, { price: 25.30, qty: 85 }, { price: 25.50, qty: 100 },
      { price: 25.80, qty: 40 }, { price: 26.00, qty: 20 },
    ],
  },
  "Accra Fintech": {
    bids: [
      { price: 29.80, qty: 60 }, { price: 29.60, qty: 95 }, { price: 29.30, qty: 140 },
      { price: 29.00, qty: 70 }, { price: 28.80, qty: 40 },
    ],
    asks: [
      { price: 30.20, qty: 65 }, { price: 30.50, qty: 100 }, { price: 30.80, qty: 130 },
      { price: 31.00, qty: 50 }, { price: 31.30, qty: 30 },
    ],
  },
};
