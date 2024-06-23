import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BellIcon, CheckIcon, TokensIcon } from "@radix-ui/react-icons";
import contestInfo from "../data/Contest";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Badge, Code2Icon, Coins, CoinsIcon, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { EffectFade } from "swiper/modules";
type Props = {};
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";

function Contests({}: Props) {
  console.log(contestInfo);
  const [checked, setChecked] = React.useState(false);
  const [mode, setMode] = React.useState("");
  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 90,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {contestInfo.map((contest, index) => {
          return (
            <SwiperSlide>
              <Card>
                <CardHeader>
                  <img
                    src={contest.image}
                    alt="Contest"
                    className="h-40 object-cover my-7 rounded"
                  />
                  <CardTitle className="text-lg h-10">{contest.name}</CardTitle>
                  <CardDescription>{contest.player}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="flex items-center space-x-4 rounded-md border border-indigo-600 p-4">
                    <Code2Icon />
                    <div className="flex-1 space-y-1 ">
                      <p className="text-sm py-2 font-medium leading-none ">
                        Programming Language : {contest.language}
                      </p>
                      <p className="text-sm h-10 text-muted-foreground">
                        Duration : {contest.duration}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                      <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500 p-2" />
                      <div className="space-y-1">
                        <p className="text-lg gap-1 flex font-medium leading-none">
                          Prize Pool : {contest.prizePool}
                          <p className="text-sm">Points per person</p>
                        </p>
                        <p className="text-sm text-muted-foreground"></p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="w-70 my-7 bg-indigo-600 hover:bg-indigo-700"
                          variant="outline"
                        >
                          {!checked
                            ? "Please Select The Mode To Start Contest"
                            : mode}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>
                            Choose The Way You Wanna Play
                          </DialogTitle>
                          <DialogDescription className="py-4">
                            Once Selected You Can't Change The Mode
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols gap-10 items-center ">
                            <Button
                              variant={
                                mode == "friends" ? "destructive" : "outline"
                              }
                              className="text-md border border-red-900"
                              onClick={() => {
                                setMode("friends");
                                setChecked(true);
                              }}
                            >
                              Contest With Friends
                            </Button>
                            <Button
                              variant={
                                mode == "global" ? "destructive" : "outline"
                              }
                              className="text-md border border-green-900"
                              onClick={() => {
                                setMode("global");
                                setChecked(true);
                              }}
                            >
                              Contest With Global Players
                            </Button>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4"></div>
                        </div>
                        <DialogFooter></DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Link to={!checked ? "" : contest.link + "&" + mode}>
                      <Button className="w-full" disabled={!checked}>
                        <CheckIcon className="mr-2 h-4 w-4" /> Start Contest
                      </Button>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

export default Contests;
