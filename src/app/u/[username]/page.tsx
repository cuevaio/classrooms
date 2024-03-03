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
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

interface UserPageProps {
  params: {
    username: string;
  };
}

export default async function Page({ params }: UserPageProps) {
  const { username } = params;

  const _classes = [
    {
      id: "1",
      name: "Repaso de Derivadas",
      price: 10,
      rating: 4.2,
      classesCount: 15,
      course: "Cálculo I",
      thumbnail:
        "https://i.ytimg.com/vi/mNhhOD3s6vs/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCKEWC3JSbUJgdRAZSNUgB9YSQqUg",
    },
    {
      id: "2",
      name: "Repaso de Integrales",
      price: 20,
      rating: 4.7,
      classesCount: 20,
      course: "Cálculo II",
      thumbnail:
        "https://i.ytimg.com/vi/rvW0ZrRDyd0/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDjD1eHcX6OL6lmBAe33SI-9co9rw",
    },
  ];

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
              className="w-8 h-8 rounded-full"
            >
              <InstagramIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
            >
              <XIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full text-sm font-bold"
            >
              2+
            </Button>
          </div>
        </div>
        <p className="font-medium text-sm">@cuevantn</p>
      </div>

      <div className="px-4 py-2 space-y-1">
        <h2 className="font-bold">Asesorías</h2>
        <div className="px-8 flex flex-col items-center justify-center w-full">
          <Carousel className="w-full">
            <CarouselContent>
              {_classes.map((_class, index) => (
                <CarouselItem key={index}>
                  <div className="">
                    <Card>
                      <CardContent className="p-0">
                        <AspectRatio
                          ratio={16 / 9}
                          className="bg-muted rounded-t-lg overflow-hidden relative"
                        >
                          <Image
                            src={_class.thumbnail}
                            fill
                            alt="Class thumbnail"
                            className="object-cover "
                          />
                          <div className="absolute bottom-0 left-0 bg-background px-2 rounded-tr text-sm font-medium">
                            {_class.course}
                          </div>
                        </AspectRatio>
                        <div className="px-2 pb-1">
                          <p className="text-lg font-semibold">
                            {_class.name} {index + 1}
                          </p>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                              <StarIcon className="w-4 h-4 font-black fill-foreground mr-1" />
                              <span className="mr-1">{_class.rating}</span>
                              <span className="text-muted-foreground">
                                ({_class.classesCount})
                              </span>
                            </div>
                            <p>
                              <span className="font-bold mr-0.5">
                                <span className="text-xs">S</span>/
                                {_class.price}
                              </span>
                              <span className="text-xs">la hora</span>
                            </p>
                          </div>
                        </div>
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

      <div className="px-4 py-2">
        <h2 className="font-bold">Sobre mí</h2>
        <p className="text-sm">
          Me gusta el diseño, la música y la ingeniería.
        </p>
      </div>
      <div className="px-4 py-2">
        <h2 className="font-bold">Estadísticas</h2>
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <StarIcon className="w-4 h-4 font-black fill-foreground mr-1" />
            <span className="font-bold">4.5</span>
            <DotIcon className="w-3 h-3" />
            <Link href="/cuevantn/reviews" className="underline">
              6 reviews
            </Link>
          </div>
          <div className="flex items-center space-x-1">
            <GraduationCapIcon className="w-4 h-4 font-black" />
            <span className="font-bold">35</span>
            <span>alumnos</span>
          </div>
          <div className="flex items-center space-x-1">
            <BookAIcon className="w-4 h-4 font-black" />
            <span className="font-bold">2</span>
            <span>asesorías</span>
          </div>
        </div>
      </div>
    </div>
  );
}
