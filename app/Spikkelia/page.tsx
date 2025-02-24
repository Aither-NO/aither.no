"use client"
import { useParams} from "next/navigation";
import { useEffect } from "react";

export default function SpikkeliaPage(){
  const params = useParams<{ slug: string; }>();

  useEffect(() => {
     window.location.href = `https://r1137465.website.cgtul6dky.service.one/Spikkelia`;
  }, [params.slug]);
  return null;
} 