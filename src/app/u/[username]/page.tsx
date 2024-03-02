import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { InstagramIcon } from "@/components/ui/icons/instagram";
import { XIcon } from "@/components/ui/icons/x";
import { Separator } from "@/components/ui/separator";
import {
  BookAIcon,
  ClockIcon,
  DotIcon,
  GraduationCapIcon,
  StarIcon,
} from "lucide-react";
import Link from "next/link";

interface UserPageProps {
  params: {
    username: string;
  };
}

export default async function Page({ params }: UserPageProps) {
  const { username } = params;

  return (
    <div className="">
      <div className="px-4 py-2 bg-primary w-full flex items-center justify-center sticky top-0">
        <Input placeholder="Search" />
      </div>
      <div className="bg-primary w-full pb-2 flex items-center justify-center">
        <Avatar className="w-24 h-24 border-4 relative overflow-visible">
          <AvatarImage
            src="https://pbs.twimg.com/profile_images/1709271654113628160/759-Zwxl_400x400.jpg"
            className="z-0 rounded-full"
          />
          <AvatarFallback>JD</AvatarFallback>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-border z-10 rounded-full text-xs font-bold flex items-center justify-center">
            4.5
          </div>
        </Avatar>
      </div>
      <div className="px-4 py-2">
        <div className="flex justify-between items-center">
          <h1 className="font-black text-xl">Anthony Cueva</h1>
          <div className="flex space-x-1">
            <Button
              variant="outline"
              size="icon"
              className="h-5 w-5 rounded-full"
            >
              <InstagramIcon className="w-3 h-3" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-5 w-5 rounded-full"
            >
              <XIcon className="w-2 h-2" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-5 w-5 rounded-full text-[0.5rem] font-bold"
            >
              2+
            </Button>
          </div>
        </div>
        <p className="font-medium text-sm">@cuevantn</p>
      </div>
      <div className="px-4 py-2">
        <h2 className="font-bold">Sobre mí</h2>
        <p className="text-sm">
          Me gusta el diseño, la música y la ingeniería.
        </p>
      </div>
      <div className="px-4 py-2">
        <h2 className="font-bold">Estadísticas</h2>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-1">
            <StarIcon className="w-4 h-4 font-black" />
            <div className="flex items-center">
              <span>4.5</span>
              <DotIcon className="w-3 h-3" />
              <span>36 calificaciones</span>
              <DotIcon className="w-3 h-3" />
              <Link href="/cuevantn/reviews" className="underline">
                6 reviews
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <GraduationCapIcon className="w-4 h-4 font-black" />
            <span>42 alumnos</span>
          </div>
          <div className="flex items-center space-x-1">
            <ClockIcon className="w-4 h-4 font-black" />
            <span>53 horas</span>
          </div>
          <div className="flex items-center space-x-1">
            <BookAIcon className="w-4 h-4 font-black" />
            <span>4 cursos</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-2 flex flex-col items-center justify-center">
        <h2 className="font-bold">Cursos</h2>
        <Carousel className="w-2/3">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col aspect-video items-center justify-center p-6">
                      <p className="text-4xl font-semibold">
                        Cálculo {index + 1}
                      </p>
                      <p>
                        S/ {(index + 1) * 10} <span>/hora</span>
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
