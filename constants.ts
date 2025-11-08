import { Seed, Product, Farmer } from './types';

export const SEEDS: Seed[] = [
  {
    id: 1,
    name: "Kalo Jira Rice",
    description: "Aromatic black rice, known for its nutty flavor and health benefits. Drought resistant.",
    optimal_ph: "5.5-6.5",
    optimal_moisture: "Medium",
    image: "https://picsum.photos/seed/101/400/300",
  },
  {
    id: 2,
    name: "Chinigura Rice",
    description: "Small-grain aromatic rice, popular for making biryani and pilaf. Requires consistent moisture.",
    optimal_ph: "6.0-7.0",
    optimal_moisture: "High",
    image: "https://picsum.photos/seed/102/400/300",
  },
  {
    id: 3,
    name: "Balam Dhan",
    description: "A traditional long-grain rice variety that is resilient to pests and thrives in loamy soil.",
    optimal_ph: "5.8-6.8",
    optimal_moisture: "Medium",
    image: "https://picsum.photos/seed/103/400/300",
  },
  {
    id: 4,
    name: "Nazirshail",
    description: "A popular fine rice variety known for its taste and texture. Adaptable to various soil types.",
    optimal_ph: "5.5-7.0",
    optimal_moisture: "Medium-High",
    image: "https://picsum.photos/seed/104/400/300",
  },
  {
    id: 5,
    name: "BRRI Dhan 29",
    description: "A high-yielding variety developed for the Boro season, known for its tolerance to slightly saline conditions.",
    optimal_ph: "6.5-7.5",
    optimal_moisture: "High",
    image: "https://picsum.photos/seed/105/400/300",
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Organic Kalo Jira Rice (5kg)",
    farmer: "Rahim Ali",
    price: 650,
    description: "Freshly harvested, naturally grown Kalo Jira rice from our farm in Mymensingh. No chemicals used.",
    image: "https://picsum.photos/seed/201/400/300",
  },
  {
    id: 2,
    name: "Premium Chinigura Rice (10kg)",
    farmer: "Fatima Begum",
    price: 1200,
    description: "Sun-dried aromatic Chinigura rice, perfect for special occasions. Sourced from organic farms in Dinajpur.",
    image: "https://picsum.photos/seed/202/400/300",
  },
  {
    id: 3,
    name: "Healthy Balam Rice (5kg)",
    farmer: "Jamal Uddin",
    price: 550,
    description: "Traditional Balam rice, cultivated using sustainable methods that restore soil health. From our fields in Khulna.",
    image: "https://picsum.photos/seed/203/400/300",
  },
];

export const FARMERS: Farmer[] = [
    {
        id: 'farmer-1',
        name: 'Rahim Ali',
        contact: 'rahim.ali@example.com',
        productIds: [1]
    },
    {
        id: 'farmer-2',
        name: 'Fatima Begum',
        contact: 'fatima.b@example.com',
        productIds: [2]
    },
    {
        id: 'farmer-3',
        name: 'Jamal Uddin',
        contact: 'jamal.uddin@example.com',
        productIds: [3]
    }
];