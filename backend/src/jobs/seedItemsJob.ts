import { fetchItemsFromApi } from "../services/itemService";
import { supabaseAdmin } from "../config/postgres";

type Rarity = {
  id?: string;
  name?: string;
  color?: string;
};

type CSItem = {
  id: string;
  type?: string;
  name?: string;
  description?: string;
  image?: string;
  rarity?: Rarity;
  market_hash_name?: string;
  def_index?: string;
  [key: string]: any;
}

type DBItem = {
  id: string;
  type: string | null;
  name: string | null;
  description: string | null;
  image: string | null;
  rarity: Rarity | null;
  market_hash_name: string | null;
  def_index: string | null;
  data: CSItem;
  updated_at: string;
};

function chunk<T>(arr: T[], size = 500): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export default async function seedItemsJob() {
  const response: Record<string, CSItem> = await fetchItemsFromApi();
  const items: CSItem[] = Object.values(response);

  const formatted: DBItem[] = items.map((item) => ({
    id: item.id,
    type: item.type ?? null,
    name: item.name ?? null,
    description: item.description ?? null,
    image: item.image ?? null,
    rarity: item.rarity ?? null,
    market_hash_name: item.market_hash_name ?? null,
    def_index: item.def_index ?? null,
    data: item,
    updated_at: new Date().toISOString(),
  }));

  const chunks = chunk(formatted, 500);

for (const [index, batch] of chunks.entries()) {
  const { error } = await supabaseAdmin
    .from("items")
    .upsert(batch, { onConflict: "id" });

  if (error) {
    console.error(`Chunk ${index} failed`, error);
    throw error;
  }

  console.log(`Seeded chunk ${index + 1}/${chunks.length}`);
}
}