//Creando servicios por cada API

import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  // Comprobando que el path de la imagen coincida con el de supabase cuando se edita
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // Creamos un nombre unico para cada archivo de imagen que se suba reemplazamos los / debido al formato de supabase
  const imageName = `${Math.random()}=${newCabin.image.name}`.replaceAll("/", "");

  // Creamos el path de la imagen en supabase,

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images//${imageName}`;

  //1. Creando y editando la nueva cabina

  let query = supabase.from("cabins");

  //1.1 Creando cabina
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //1.2 Editando la cabina ya creada

  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  //2. Subimos la imagen

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3. Eliminamos la cabina si hay un error al subir la imgaen

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Cabin image could not be uploades and the cabin was not created");
  }
  return data;
}

export async function deleteCabin(id) {
  //Eliminando columnas de la tabla
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}
