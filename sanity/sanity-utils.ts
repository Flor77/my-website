import { Project } from "@/types/Project";
import { Page } from "@/types/Page";
import { createClient, groq } from "next-sanity";
import clientConfig from "./config/client-config"

export async function getProjects(): Promise<Project[]> {
  try {
    return await createClient(clientConfig).fetch(
      groq`*[_type == "project" ]{
        _id,
        _createdAt,
        name,
        "slug": slug.current,
        "image": image.asset->url,
        url,
        content
      }`,
    );;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export async function getProject(slug: string): Promise<Project> {
  try {
    return await createClient(clientConfig).fetch(
      groq`*[_type == "project" && slug.current == $slug][0]{
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "image": image.asset->url,
      url,
      content
    }`,
      { slug }
    )
  } catch (error) {
    console.error("Error fetching project:", error);
    throw error;
  }
}

export async function getPages(): Promise<Page[]>{
  try {
    return createClient(clientConfig).fetch(
      groq`*[_type == "page"]{
        _id,
        _createdAt,
        title,
        "slug": slug.current
      }`
    )
  } catch (error) {
    console.error("Error fetching pages:", error);
    throw error;
  }
}

export async function getPage(slug: string): Promise<Page>{
  try {
    return createClient(clientConfig).fetch(
      groq`*[_type == "page" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        "slug": slug.current,
        content
      }`,
      { slug }
    )
  } catch (error) {
    console.error("Error fetching page:", error);
    throw error;
  }
}





