"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Baby,
  Heart,
  Home,
  PauseCircle,
  PlayCircle,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function LandingPage() {
  const galleryPhotos = [
    {
      title: "Esposa",
      icon: Heart,
      images: ["/assets/avos.jpg", "/assets/avos-2.jpg"],
    },
    {
      title: "Filhos",
      icon: Users,
      images: [
        "/assets/4.png",
        "/assets/filhos.jpg",
        "/assets/filha.jpg",
        "/assets/filho.jpg",
        "/assets/7.png",
        "/assets/5.png",
        "/assets/6.jpeg",
      ],
    },
    {
      title: "Netos",
      icon: Baby,
      images: [
        "/assets/renan.jpg",
        "/assets/tulio.jpg",
        "/assets/joao-g.jpg",
        "/assets/otavio.jpeg",
        "/assets/netos.jpg",
        "/assets/1.png",
        "/assets/11.png",
        "/assets/13.png",
      ],
    },
    {
      title: "Familiares",
      icon: Home,
      images: [
        "/assets/8.png",
        "/assets/9.png",
        "/assets/2.png",
        "/assets/3.png",
        "/assets/10.png",
        "/assets/12.png",
        "/assets/familia.jpg",
        "/assets/familia2.jpg",
        "/assets/familia3.jpg",
      ],
    },
  ];
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!entered) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [entered]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  const startAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    setEntered(true);
  };

  const pauseAudio = () => {
    audioRef.current?.pause();
  };

  return (
    <main className="flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-b from-white to-gray-100 text-gray-800">
      {!entered && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <motion.button
            onClick={startAudio}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center px-8 py-4 text-lg font-bold text-white bg-blue-600 rounded-2xl shadow-lg hover:bg-blue-700"
          >
            <PlayCircle size={24} className="mr-2" /> Reproduzir
          </motion.button>
        </div>
      )}
      <audio ref={audioRef} src="/musica.mp3" loop />
      <div className="relative w-full h-screen">
        <Image
          src="/assets/vo-banner.jpg"
          alt="Banner"
          fill
          quality={100}
          priority
          className="object-cover"
        />
        <AnimatePresence>
          {entered && (
            <motion.div
              key="conteudo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white text-center px-4"
            >
              <motion.h1
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold drop-shadow-lg"
              >
                Feliz Aniversário Professor
                <br /> Ramiro Canedo de Carvalho
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="mt-4 text-lg md:text-2xl max-w-2xl drop-shadow"
              >
                Celebrando seus 85 anos de histórias, conquistas e amor pela
                família.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <section className="w-full max-w-5xl py-10 px-4">
        <h2 className="text-2xl font-bold mb-12 text-center">Homenagem</h2>
        <p className="text-lg text-justify text-gray-600 leading-relaxed">
          Hoje celebramos não apenas seus 85 anos de vida, mas também toda a
          história, ensinamentos e amor que o senhor compartilhou com nossa
          família. Cada momento vivido ao seu lado é uma inspiração e uma
          lembrança preciosa. Que este dia seja repleto de alegria, saúde e
          muito carinho. Feliz aniversário!
        </p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative bg-gray-100 max-w-2xl mx-auto mt-8 rounded-xl shadow-md"
        >
          <AspectRatio ratio={4 / 5}>
            <Image
              src="/assets/carta.jpg"
              alt="Carta"
              fill
              className="object-cover rounded-xl"
            />
          </AspectRatio>
        </motion.div>
      </section>

      <section className="w-full max-w-5xl py-16 px-4">
        <h2 className="text-2xl font-bold mb-12 text-center">Galeria</h2>

        <div className="space-y-12">
          {galleryPhotos.map((group, i) => (
            <div key={i} className="flex flex-col justify-center">
              <h3 className="flex items-center justify-center gap-2 text-xl font-semibold mb-6 text-center">
                <group.icon className="size-5 text-blue-500" />
                {group.title}
              </h3>
              {group.title === "Familiares" ? (
                <div className="columns-1 md:columns-2 gap-4 space-y-4">
                  {group.images.map((src, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: j * 0.1 }}
                      className="overflow-hidden rounded-xl"
                    >
                      <Image
                        src={src}
                        alt={`${group.title} ${j + 1}`}
                        width={1200}
                        height={800}
                        className="object-cover w-full h-auto"
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
                  {group.images.map((src, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: j * 0.1 }}
                      className="relative w-full rounded-xl overflow-hidden bg-gray-100"
                    >
                      <AspectRatio ratio={4 / 5}>
                        <Image
                          src={src}
                          alt={`${group.title} ${j + 1}`}
                          fill
                          className="object-cover"
                        />
                      </AspectRatio>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-5xl text-center py-20 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
            Obrigado por ser o coração da nossa família
            <Heart className="w-6 h-6 text-red-500 fill-red-500" />
          </h2>
          <p className="text-gray-600">
            Com amor, de todos os filhos, netos e familiares.
          </p>
        </motion.div>
      </section>
      {entered && (
        <button
          onClick={toggleAudio}
          className="flex items-center gap-2 cursor-pointer text-blue-500"
        >
          <PauseCircle className="w-8 h-8" />
          Pausar música
        </button>
      )}
      <section className="w-full max-w-4xl py-16 px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Nossa Homenagem em Vídeo
        </h2>
        <AspectRatio
          ratio={16 / 9}
          className="overflow-hidden rounded-xl shadow-lg"
        >
          <iframe
            src="https://www.youtube.com/embed/ggurU3ktZww"
            title="Vídeo de homenagem"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </AspectRatio>
      </section>
    </main>
  );
}

