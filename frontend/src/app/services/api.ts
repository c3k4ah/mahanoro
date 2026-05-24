import PocketBase from "pocketbase";

const PB_URL = import.meta.env.VITE_PB_URL || "/";
const BASE_PATH = PB_URL === "/" ? "" : PB_URL;

const pb = new PocketBase(PB_URL);

pb.autoCancellation(false);

export interface Article {
    id: string;
    slug: string;
    title: string;
    category: string;
    excerpt: string;
    content: string;
    imageUrl: string;
    publishedAt: string;
    isFeatured: boolean;
}

export interface Event {
    id: string;
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
    imageUrl: string;
    isArchived: boolean;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
}

export async function fetchArticles(): Promise<Article[]> {
    const records = await pb.collection("articles").getFullList({
        sort: "-publishedAt",
    });
    return records.map((r) => ({
        id: r.id,
        slug: r.slug,
        title: r.title,
        category: r.category,
        excerpt: r.excerpt,
        content: r.content,
        imageUrl: r.imageUrl ? `${BASE_PATH}/api/files/${r.collectionId}/${r.id}/${r.imageUrl}` : "",
        publishedAt: r.publishedAt,
        isFeatured: r.isFeatured,
    }));
}

export async function fetchEvents(): Promise<Event[]> {
    const records = await pb.collection("events").getFullList({
        sort: "-startDate",
    });
    return records.map((r) => ({
        id: r.id,
        title: r.title,
        description: r.description,
        location: r.location,
        startDate: r.startDate,
        endDate: r.endDate,
        imageUrl: r.imageUrl ? `${BASE_PATH}/api/files/${r.collectionId}/${r.id}/${r.imageUrl}` : "",
        isArchived: r.isArchived,
    }));
}

export async function fetchCategories(): Promise<Category[]> {
    const records = await pb.collection("categories").getFullList({
        sort: "name",
    });
    return records.map((r) => ({
        id: r.id,
        name: r.name,
        slug: r.slug,
    }));
}
