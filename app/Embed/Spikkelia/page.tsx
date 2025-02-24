"use client"
import { useParams} from "next/navigation";
import { useEffect } from "react";

export default function SpikkeliaEmbedPage(){
  const params = useParams<{ slug: string; }>();

  useEffect(() => {
     window.location.href = `https://r1137465.website.cgtul6dky.service.one/Embed/Spikkelia`;
  }, [params.slug]);
  return null;
} 